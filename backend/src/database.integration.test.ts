import assert from 'node:assert/strict'
import { test } from 'node:test'

const integrationUrl = process.env.LEARNGRID_INTEGRATION_DATABASE_URL
process.env.NODE_ENV = 'test'
if (integrationUrl) process.env.DATABASE_URL = integrationUrl
else process.env.DATABASE_URL ??= 'postgres://learngrid_test:learngrid_test@127.0.0.1:5432/learngrid_test'

test('real PostgreSQL connectivity, readiness, and pool shutdown', { skip: !integrationUrl && 'Set LEARNGRID_INTEGRATION_DATABASE_URL to a disposable PostgreSQL test database.' }, async () => {
  const parsedUrl = new URL(integrationUrl!)
  assert.match(decodeURIComponent(parsedUrl.pathname.slice(1)), /_test$/, 'Integration database name must end in _test')

  const [{ buildApp }, { db, pool }, { sql }] = await Promise.all([
    import('./app.js'),
    import('./db/client.js'),
    import('drizzle-orm'),
  ])

  const app = buildApp()
  try {
    await app.ready()
    const result = await db.execute(sql`select current_database() as database, current_setting('server_version_num')::int as version`)
    const row = result.rows[0] as { database: string; version: number } | undefined
    assert.ok(row)
    assert.match(row.database, /_test$/)
    assert.ok(row.version >= 180000, `Expected PostgreSQL 18+, got server_version_num=${row.version}`)

    const readiness = await app.inject('/api/v1/health/ready')
    assert.equal(readiness.statusCode, 200)
    assert.deepEqual(readiness.json(), { status: 'ok', database: 'ok' })
  } finally {
    await app.close()
  }

  assert.equal(pool.ended, true, 'Application close should release the PostgreSQL pool')
})
