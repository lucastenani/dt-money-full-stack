import cookie from '@fastify/cookie'
import cors from '@fastify/cors'
import fastify from 'fastify'

import { env } from './env'
import { transactionsRoutes } from './routes/transactions'

export const app = fastify()

app.register(cors, {
  origin: env.CLIENT_ORIGIN,
  methods: ['GET', 'POST', 'PATCH'],
  credentials: true,
})

app.register(cookie)

app.register(transactionsRoutes, {
  prefix: 'transactions',
})
