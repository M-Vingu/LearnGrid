import { pathToFileURL } from 'node:url'
import { buildApp } from './app.js'
import { config } from './config.js'
import { registerGracefulShutdown } from './shutdown.js'

export async function startServer() {
  const app = buildApp()
  registerGracefulShutdown(app)

  try {
    await app.listen({ host: config.HOST, port: config.PORT })
  } catch (error) {
    app.log.error(error, 'Server startup failed')
    await app.close()
    process.exitCode = 1
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await startServer()
}
