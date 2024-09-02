import { randomUUID } from 'node:crypto'

import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { knex } from '../database'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

export async function transactionsRoutes(app: FastifyInstance) {
  app.get(
    '/',
    { preHandler: [checkSessionIdExists] },
    async (request: FastifyRequest) => {
      const { sessionId } = request.cookies
      const getTransactionParamsSchema = z.object({
        title: z.string().optional().nullable(),
        amount: z.string().optional().nullable(),
        createdAt: z.string().optional().nullable(),
        type: z.enum(['income', 'outcome']).optional().nullable(),
      })

      const { title, amount, type, createdAt } =
        getTransactionParamsSchema.parse(request.query)

      const query = knex('transactions').where('session_id', sessionId).select()

      if (title) {
        query.where('title', 'like', `%${title}%`)
      }

      if (amount) {
        query.where('amount', amount)
      }

      if (createdAt) {
        query.whereRaw('DATE(created_at) = ?', [createdAt]) // Aplicando o filtro de data
      }

      if (type) {
        query.where('type', type).where('type', type)
      }

      const transactions = await query

      return { transactions }
    },
  )

  app.get(
    '/:id',
    { preHandler: [checkSessionIdExists] },
    async (request: FastifyRequest) => {
      const { sessionId } = request.cookies

      const getTransactionParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getTransactionParamsSchema.parse(request.params)
      const transaction = await knex('transactions')
        .where({
          id,
          session_id: sessionId,
        })
        .first()

      return { transaction }
    },
  )

  app.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['income', 'outcome']),
    })

    const { amount, title, type } = createTransactionBodySchema.parse(
      request.body,
    )

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      })
    }

    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'income' ? amount : amount * -1,
      type,
      session_id: sessionId,
    })

    return reply.status(201).send()
  })

  app.patch(
    '/:id/exclude',
    { preHandler: [checkSessionIdExists] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { sessionId } = request.cookies

      const getTransactionParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getTransactionParamsSchema.parse(request.params)

      const currentTransaction = await knex('transactions')
        .where({
          id,
          session_id: sessionId,
        })
        .first()

      if (!currentTransaction) {
        return reply.status(404).send()
      }

      await knex('transactions')
        .where({
          id,
          session_id: sessionId,
        })
        .update({
          isExcludedFromBalance:
            currentTransaction.isExcludedFromBalance === 0 ? 1 : 0,
        })

      return reply.status(200).send()
    },
  )

  app.get(
    '/summary',
    { preHandler: [checkSessionIdExists] },
    async (request: FastifyRequest) => {
      const { sessionId } = request.cookies

      const getSumByType = async (type: 'income' | 'outcome' | null) => {
        const query = knex('transactions')
          .where({ session_id: sessionId, isExcludedFromBalance: 0 })
          .sum('amount', { as: 'total' })

        if (type) {
          query.where('type', type)
        }
        return query.first()
      }

      const [total, incomeData, outcomeData] = await Promise.all([
        getSumByType(null),
        getSumByType('income'),
        getSumByType('outcome'),
      ])

      return {
        summary: {
          total: total?.total ?? 0,
          incomes: incomeData?.total ?? 0,
          outcomes: outcomeData?.total ?? 0,
        },
      }
    },
  )
}
