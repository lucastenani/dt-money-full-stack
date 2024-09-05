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

    return {
      id: `75c20f2d-badb-4531-b481-e9f373ea530${i}`,
      title: `Title number ${i}`,
      amount: isIncome
        ? Math.floor(Math.random() * 800)
        : Math.floor(Math.random() * 800) * -1,
      created_at: new Date().toISOString(),
      isExcludedFromBalance: 0,
      session_id: 'c563c32c-539f-486a-9be9-3755394640a3',
      type: isIncome ? 'income' : 'outcome',
    }
  }),
}

export const getTransactionsMock = http.get<
  never,
  GetTransactionsParams,
  GetTransactionsResponse | ErrorResponse
>('/transactions', async ({ cookies }) => {
  const authToken = cookies.sessionId

  if (authToken !== 'c563c32c-539f-486a-9be9-3755394640a3') {
    return HttpResponse.json(
      {
        error: 'Unauthorized',
      },
      { status: 401 },
    )
  }

  return HttpResponse.json(transactions, { status: 200 })
})
