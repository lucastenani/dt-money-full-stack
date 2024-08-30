import cookie from '@fastify/cookie'
import cors from '@fastify/cors'
import fastify from 'fastify'

import { env } from './env'
import { transactionsRoutes } from './routes/transactions'

const app = fastify()

app.register(cors, {
  origin: env.CLIENT_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
})

app.register(cookie)

app.register(transactionsRoutes, {
  prefix: 'transactions',
})

app.listen({ port: env.PORT }).then(() => {
  console.log('HTTP Server Running!')
})
