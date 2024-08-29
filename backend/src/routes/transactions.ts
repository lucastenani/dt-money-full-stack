import { randomUUID } from 'node:crypto'

import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { knex } from '../database'

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const transactions = await knex('transactions').select()

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
    // Função auxiliar para obter a soma dos valores com base no tipo
    const getSumByType = async (type: 'income' | 'outcome' | null) => {
      const query = knex('transactions').sum('amount', { as: 'total' })
      if (type) {
        query.where('type', type)
      }
      return query.first()
    }

    // Obtém o total, receitas e despesas
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
