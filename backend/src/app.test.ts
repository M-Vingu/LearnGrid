import assert from 'node:assert/strict'
import { test } from 'node:test'
import type { FastifyPluginAsync } from 'fastify'
import { z } from 'zod'
import { registerGracefulShutdown } from './shutdown.js'

process.env.NODE_ENV ??= 'test'
process.env.DATABASE_URL ??= 'postgres://learngrid_test:learngrid_test@127.0.0.1:5432/learngrid_test'

const { buildApp } = await import('./app.js')
const { parseConfig } = await import('./config.js')

async function withApp<T>(operation: (app: ReturnType<typeof buildApp>) => Promise<T>, options: Parameters<typeof buildApp>[0] = {}) {
  const app = buildApp({ closeDatabase: async () => {}, ...options })
  try {
    await app.ready()
    return await operation(app)
  } finally {
    await app.close()
  }
}

test('liveness endpoint returns healthy without requiring PostgreSQL', async () => {
  await withApp(async (app) => {
    const response = await app.inject({ method: 'GET', url: '/api/v1/health/live' })

    assert.equal(response.statusCode, 200)
    assert.deepEqual(response.json(), { status: 'ok' })
    assert.equal(response.headers['x-content-type-options'], 'nosniff')
  }, { checkDatabase: async () => { throw new Error('Database should not be called') } })
})

test('readiness reports healthy after a successful database check', async () => {
  let databaseChecks = 0
  await withApp(async (app) => {
    const response = await app.inject('/api/v1/health/ready')
    assert.equal(response.statusCode, 200)
    assert.deepEqual(response.json(), { status: 'ok', database: 'ok' })
    assert.equal(databaseChecks, 1)
  }, { checkDatabase: async () => { databaseChecks += 1 } })
})

test('readiness returns a generic 503 when the database check fails', async () => {
  await withApp(async (app) => {
    const response = await app.inject('/api/v1/health/ready')
    assert.equal(response.statusCode, 503)
    assert.deepEqual(response.json(), { status: 'unavailable', database: 'unavailable' })
    assert.equal(response.body.includes('private database detail'), false)
  }, { checkDatabase: async () => { throw new Error('private database detail') } })
})

test('configuration validation rejects invalid or production-incomplete settings without echoing secrets', () => {
  assert.throws(() => parseConfig({ DATABASE_URL: 'not-a-database-url' }), /Invalid backend configuration/)
  assert.throws(() => parseConfig({ NODE_ENV: 'production', DATABASE_URL: 'postgres://user:do-not-print@localhost/db' }), (error: Error) => {
    assert.match(error.message, /CORS_ORIGINS/)
    assert.equal(error.message.includes('do-not-print'), false)
    return true
  })
  assert.throws(() => parseConfig({ DATABASE_URL: 'https://localhost/db' }), /Use a PostgreSQL connection URL/)
})

test('Fastify request schema rejects invalid bodies with a safe validation response', async () => {
  const validationRoutes: FastifyPluginAsync = async (app) => {
    app.post('/test/validated', { schema: { body: { type: 'object', required: ['name'], properties: { name: { type: 'string' } }, additionalProperties: false } } }, async () => ({ ok: true }))
  }
  await withApp(async (app) => {
    const response = await app.inject({ method: 'POST', url: '/test/validated', payload: {} })
    assert.equal(response.statusCode, 400)
    assert.deepEqual(response.json(), { error: { code: 'INVALID_REQUEST', message: 'Request validation failed.' } })
  }, { extraRoutes: validationRoutes })
})

test('Zod validation failures use the same generic client response', async () => {
  const validationRoutes: FastifyPluginAsync = async (app) => {
    app.get('/test/zod', async () => ({ value: z.string().parse(42) }))
  }
  await withApp(async (app) => {
    const response = await app.inject('/test/zod')
    assert.equal(response.statusCode, 400)
    assert.deepEqual(response.json(), { error: { code: 'VALIDATION_ERROR', message: 'Request validation failed.' } })
  }, { extraRoutes: validationRoutes })
})

test('unexpected exceptions return no internal details', async () => {
  const errorRoutes: FastifyPluginAsync = async (app) => {
    app.get('/test/error', async () => { throw new Error('internal implementation detail') })
  }
  await withApp(async (app) => {
    const response = await app.inject('/test/error')
    assert.equal(response.statusCode, 500)
    assert.deepEqual(response.json(), { error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred.' } })
    assert.equal(response.body.includes('internal implementation detail'), false)
  }, { extraRoutes: errorRoutes })
})

test('CORS permits configured origins and omits permission for unknown origins', async () => {
  await withApp(async (app) => {
    const allowed = await app.inject({ method: 'OPTIONS', url: '/api/v1/health/live', headers: { origin: 'http://localhost:5173', 'access-control-request-method': 'GET' } })
    const denied = await app.inject({ method: 'OPTIONS', url: '/api/v1/health/live', headers: { origin: 'https://untrusted.example', 'access-control-request-method': 'GET' } })
    assert.equal(allowed.headers['access-control-allow-origin'], 'http://localhost:5173')
    assert.equal(denied.headers['access-control-allow-origin'], undefined)
  }, { corsOrigins: ['http://localhost:5173'] })
})

test('rate limiting rejects requests after the configured test threshold', async () => {
  await withApp(async (app) => {
    assert.equal((await app.inject('/api/v1/health/live')).statusCode, 200)
    assert.equal((await app.inject('/api/v1/health/live')).statusCode, 200)
    const limited = await app.inject('/api/v1/health/live')
    assert.equal(limited.statusCode, 429)
  }, { rateLimitMax: 2 })
})

test('SIGTERM and SIGINT trigger graceful close once and release database resources', async () => {
  let closeCount = 0
  const signals = new Map<string, () => void>()
  const app = buildApp({ closeDatabase: async () => { closeCount += 1 } })
  await app.ready()
  const shutdown = registerGracefulShutdown(app, (signal, handler) => { signals.set(signal, handler) })
  assert.deepEqual([...signals.keys()], ['SIGINT', 'SIGTERM'])
  signals.get('SIGTERM')?.()
  await shutdown()
  assert.equal(closeCount, 1)
})

test('authorization and cookie secrets are redacted from request logs', async () => {
  let logs = ''
  const app = buildApp({
    closeDatabase: async () => {},
    logStream: { write: (line) => { logs += line } },
  })
  try {
    await app.ready()
    await app.inject({ method: 'GET', url: '/api/v1/health/live', headers: { authorization: 'Bearer test-auth-secret', cookie: 'session=test-cookie-secret' } })
    app.log.info({
      req: { headers: { authorization: 'Bearer test-auth-secret', cookie: 'session=test-cookie-secret' } },
      res: { headers: { 'set-cookie': 'session=test-response-secret' } },
      password: 'test-password-secret',
      token: 'test-token-secret',
    }, 'redaction probe')
    assert.equal(logs.includes('test-auth-secret'), false)
    assert.equal(logs.includes('test-cookie-secret'), false)
    assert.equal(logs.includes('test-password-secret'), false)
    assert.equal(logs.includes('test-token-secret'), false)
    assert.equal(logs.includes('test-response-secret'), false)
    assert.equal(logs.includes('[REDACTED]'), true)
  } finally {
    await app.close()
  }
})
