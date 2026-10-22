import type { FastifyBaseLogger } from 'fastify'

type ShutdownSignal = 'SIGINT' | 'SIGTERM'
type ShutdownApp = {
  close: () => Promise<unknown>
  log: Pick<FastifyBaseLogger, 'info' | 'error'>
}

export function registerGracefulShutdown(
  app: ShutdownApp,
  registerSignal: (signal: ShutdownSignal, handler: () => void) => void = (signal, handler) => process.once(signal, handler),
) {
  let closing: Promise<void> | undefined
  const shutdown = () => {
    closing ??= app.close()
      .then(() => { app.log.info('Server shutdown complete') })
      .catch((error: unknown) => {
        app.log.error({ err: error }, 'Server shutdown failed')
        process.exitCode = 1
      })
    return closing
  }

  const handleSignal = () => { void shutdown() }
  registerSignal('SIGINT', handleSignal)
  registerSignal('SIGTERM', handleSignal)
  return shutdown
}
