import type { FastifyPluginAsync } from 'fastify'

const healthRoutes: FastifyPluginAsync = async (app) => {
  app.get('/live', {
    schema: {
      tags: ['health'],
      response: { 200: { type: 'object', properties: { status: { type: 'string' } }, required: ['status'] } },
    },
  }, async () => ({ status: 'ok' }))

  app.get('/ready', {
    schema: {
      tags: ['health'],
      response: {
        200: { type: 'object', properties: { status: { type: 'string' }, database: { type: 'string' } }, required: ['status', 'database'] },
        503: { type: 'object', properties: { status: { type: 'string' }, database: { type: 'string' } }, required: ['status', 'database'] },
      },
    },
  }, async (request, reply) => {
    try {
      await app.checkDatabase()
      return { status: 'ok', database: 'ok' }
    } catch (error) {
      request.log.error({ err: error }, 'Readiness check failed')
      return reply.code(503).send({ status: 'unavailable', database: 'unavailable' })
    }
  })
}

export default healthRoutes
