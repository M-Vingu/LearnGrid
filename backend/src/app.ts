import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import rateLimit from '@fastify/rate-limit'
import Fastify, { type FastifyError, type FastifyPluginAsync } from 'fastify'
import { ZodError } from 'zod'
import { sql } from 'drizzle-orm'
import { config } from './config.js'
import { db, pool } from './db/client.js'
import apiRoutes from './routes/index.js'

declare module 'fastify' {
  interface FastifyInstance {
    checkDatabase: () => Promise<unknown>
  }
}

interface AppOptions {
  checkDatabase?: () => Promise<unknown>
  closeDatabase?: () => Promise<void>
  rateLimitMax?: number
  corsOrigins?: string[]
  extraRoutes?: FastifyPluginAsync
  logStream?: { write: (line: string) => void }
}

export function buildApp(options: AppOptions = {}) {
  const app = Fastify({
    logger: {
      level: config.LOG_LEVEL,
      ...(options.logStream ? { stream: options.logStream } : {}),
      redact: {
        paths: ['req.headers.authorization', 'req.headers.cookie', 'res.headers.set-cookie', 'password', 'token', '*.password', '*.token'],
        censor: '[REDACTED]',
      },
    },
    bodyLimit: 1_048_576,
    trustProxy: false,
  })

  if (!options.checkDatabase) {
    pool.on('error', (error) => {
      app.log.error({ err: error }, 'Unexpected idle PostgreSQL client error')
    })
  }

  app.decorate('checkDatabase', options.checkDatabase ?? (async () => db.execute(sql`select 1`)))

  app.register(helmet)
  app.register(cors, { origin: options.corsOrigins ?? config.CORS_ORIGINS })
  app.register(rateLimit, { max: options.rateLimitMax ?? 120, timeWindow: '1 minute' })
  app.register(apiRoutes, { prefix: '/api/v1' })
  if (options.extraRoutes) app.register(options.extraRoutes)

  app.setErrorHandler<FastifyError>((error, request, reply) => {
    if (error instanceof ZodError) {
      return reply.code(400).send({ error: { code: 'VALIDATION_ERROR', message: 'Request validation failed.' } })
    }

    if (error.validation) {
      return reply.code(400).send({ error: { code: 'INVALID_REQUEST', message: 'Request validation failed.' } })
    }

    request.log.error({ err: error }, 'Request failed')
    const statusCode = error.statusCode && error.statusCode < 500 ? error.statusCode : 500
    return reply.code(statusCode).send({
      error: {
        code: statusCode === 500 ? 'INTERNAL_ERROR' : 'REQUEST_ERROR',
        message: statusCode === 500 ? 'An unexpected error occurred.' : error.message,
      },
    })
  })

  app.addHook('onClose', async () => {
    if (options.closeDatabase) await options.closeDatabase()
    else await pool.end()
  })

  return app
}
