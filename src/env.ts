import { z } from 'zod'

const envSchema = z.object({
  VITE_GOOGLE_API_KEY: z.string().min(30),
})

const _env = envSchema.safeParse(import.meta.env)

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables')
}

export const env = _env.data
