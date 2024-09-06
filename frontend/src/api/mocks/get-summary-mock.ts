import { http, HttpResponse } from 'msw'

import { GetSummaryResponse } from '../get-summary'
import { ErrorResponse } from './get-transactions-mock'

export const getSummaryMock = http.get<
  never,
  never,
  GetSummaryResponse | ErrorResponse
>('/transactions/summary', async ({ cookies }) => {
  const authToken = cookies.sessionId
  if (authToken !== 'c563c32c-539f-486a-9be9-3755394640a3') {
    return HttpResponse.json(
      {
        error: 'Unauthorized',
      },
      { status: 401 },
    )
  }

  const incomes = Math.floor(Math.random() * 10000)
  const outcomes = Math.floor(Math.random() * 10000) * -1
  const total = incomes + outcomes

  return HttpResponse.json({
    summary: {
      total,
      incomes,
      outcomes,
    },
  })
})
