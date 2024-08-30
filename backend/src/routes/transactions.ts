import { randomUUID } from 'node:crypto'
import { type } from 'node:os'

import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { knex } from '../database'

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/', async (request: FastifyRequest) => {
    const getTransactionParamsSchema = z.object({
      title: z.string().optional().nullable(),
      amount: z.string().optional().nullable(),
      // date: z.string().optional().nullable(),
      type: z.enum(['income', 'outcome']).optional().nullable(),
    })

    const { title, amount, type } = getTransactionParamsSchema.parse(
      request.query,
    )

    const query = knex('transactions').select()

    if (title) {
      query.where('title', 'like', `%${title}%`)
    }

    if (amount) {
      query.where('amount', amount)
    }

    // if (date) {
    //   query.whereRaw('DATE(created_at) = ?', [date])
    // }

    if (type) {
      query.where('type', type).where('type', type)
    }

    const transactions = await query

    return { transactions }
  })

  app.get('/:id', async (request: FastifyRequest) => {
    const getTransactionParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getTransactionParamsSchema.parse(request.params)
    const transaction = await knex('transactions').where('id', id).first()

    return { transaction }
  })

  app.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['income', 'outcome']),
    })

    const { amount, title, type } = createTransactionBodySchema.parse(
      request.body,
    )

    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'income' ? amount : amount * -1,
      type,
    })

    return reply.status(201).send()
  })

  app.get('/summary', async () => {
    const getSumByType = async (type: 'income' | 'outcome' | null) => {
      const query = knex('transactions').sum('amount', { as: 'total' })
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
  })
}
