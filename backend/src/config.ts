import { z } from 'zod'

const environmentSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  HOST: z.string().min(1).default('127.0.0.1'),
  PORT: z.coerce.number().int().min(1).max(65_535).default(3000),
  DATABASE_URL: z.url().refine((value) => {
    try {
      return ['postgres:', 'postgresql:'].includes(new URL(value).protocol)
    } catch {
      return false
    }
  }, 'Use a PostgreSQL connection URL.'),
  CORS_ORIGINS: z.string().default(''),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']).default('info'),
}).superRefine((value, context) => {
  if (value.NODE_ENV === 'production' && value.CORS_ORIGINS.trim() === '') {
    context.addIssue({ code: 'custom', path: ['CORS_ORIGINS'], message: 'Set the allowed browser origins in production.' })
  }
})

export function parseConfig(environment: NodeJS.ProcessEnv) {
  const parsedEnvironment = environmentSchema.safeParse(environment)

  if (!parsedEnvironment.success) {
    const problems = parsedEnvironment.error.issues
      .map(({ path, message }) => `${path.join('.') || 'environment'}: ${message}`)
      .join('\n')
    throw new Error(`Invalid backend configuration:\n${problems}`)
  }

  return {
    ...parsedEnvironment.data,
    CORS_ORIGINS: (parsedEnvironment.data.CORS_ORIGINS || (parsedEnvironment.data.NODE_ENV === 'development'
      ? 'http://localhost:5173,http://127.0.0.1:5173'
      : ''))
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean),
  }
}

export const config = parseConfig(process.env)
