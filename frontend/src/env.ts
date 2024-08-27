import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  VITE_API_URL: z.string().url(),
})

export const env = envSchema.parse(import.meta.env)
