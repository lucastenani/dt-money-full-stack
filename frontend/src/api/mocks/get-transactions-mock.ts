import { http, HttpResponse } from 'msw'

import {
  GetTransactionsParams,
  GetTransactionsResponse,
} from '../get-transactions'

export interface ErrorResponse {
  error: string
}

const transactions: GetTransactionsResponse = {
  transactions: Array.from({ length: 10 }).map((_, i) => {
    const isIncome = Math.random() > 0.5

    const getRandomDate = () => {
      const today = new Date()
      const pastDate = new Date(today)
      const randomDays = Math.floor(Math.random() * 30)
      pastDate.setDate(today.getDate() - randomDays)
      return pastDate.toISOString()
    }

    return {
      id: `75c20f2d-badb-4531-b481-e9f373ea530${i}`,
      title: `Title number ${i}`,
      amount: isIncome
        ? Math.floor(Math.random() * 800)
        : Math.floor(Math.random() * 800) * -1,
      created_at: getRandomDate(),
      isExcludedFromBalance: 0,
      session_id: 'c563c32c-539f-486a-9be9-3755394640a3',
      type: isIncome ? 'income' : 'outcome',
    }
  }),
}

transactions.transactions.push({
  id: 'fixed-1',
  title: 'fixed income transaction',
  amount: 500,
  created_at: '2024-09-01T12:00:00.000Z',
  isExcludedFromBalance: 0,
  session_id: 'c563c32c-539f-486a-9be9-3755394640a3',
  type: 'income',
})

transactions.transactions.push({
  id: 'fixed-2',
  title: 'fixed outcome transaction',
  amount: -300,
  created_at: '2024-08-15T12:00:00.000Z',
  isExcludedFromBalance: 0,
  session_id: 'c563c32c-539f-486a-9be9-3755394640a3',
  type: 'outcome',
})

export const getTransactionsMock = http.get<
  never,
  GetTransactionsParams,
  GetTransactionsResponse | ErrorResponse
>('/transactions', async ({ cookies, request }) => {
  const authToken = cookies.sessionId

  if (authToken !== 'c563c32c-539f-486a-9be9-3755394640a3') {
    return HttpResponse.json(
      {
        error: 'Unauthorized',
      },
      { status: 401 },
    )
  }

  const { searchParams } = new URL(request.url)

  const title = searchParams.get('title')
  const amount = searchParams.get('amount')
  const createdAt = searchParams.get('createdAt')
  const type = searchParams.get('type')

  let filteredTransactions = transactions.transactions

  if (title) {
    filteredTransactions = filteredTransactions.filter((transaction) =>
      transaction.title.includes(title),
    )
  }

  if (amount) {
    filteredTransactions = filteredTransactions.filter(
      (transaction) => transaction.amount === parseFloat(amount),
    )
  }

  if (type) {
    filteredTransactions = filteredTransactions.filter((transaction) =>
      transaction.type.includes(type),
    )
  }

  if (createdAt) {
    filteredTransactions = filteredTransactions.filter((transaction) =>
      transaction.created_at.startsWith(createdAt),
    )
  }

  return HttpResponse.json(
    { transactions: filteredTransactions },
    { status: 200 },
  )
})
