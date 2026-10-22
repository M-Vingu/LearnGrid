import type { FastifyPluginAsync } from 'fastify'
import healthRoutes from './health.js'

const apiRoutes: FastifyPluginAsync = async (app) => {
  await app.register(healthRoutes, { prefix: '/health' })
}

export default apiRoutes
