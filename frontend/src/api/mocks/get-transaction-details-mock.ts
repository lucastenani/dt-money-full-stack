import { http, HttpResponse } from 'msw'

import {
  GetTransactionDetailsParams,
  GetTransactionDetailsResponse,
} from '../get-transaction-details'
import { ErrorResponse } from './get-transactions-mock'

export const getTransactionDetailsMock = http.get<
  GetTransactionDetailsParams,
  never,
  GetTransactionDetailsResponse | ErrorResponse
>('/transactions/:id', async ({ params, cookies }) => {
  const authToken = cookies.sessionId
  if (authToken !== 'c563c32c-539f-486a-9be9-3755394640a3') {
    return HttpResponse.json(
      {
        error: 'Unauthorized',
      },
      { status: 401 },
    )
  }

  return HttpResponse.json({
    transaction: {
      id: params.transactionId,
      title: 'This is a Title',
      amount: 800,
      created_at: '2024-09-03T17:43:19.069Z',
      isExcludedFromBalance: 0,
      session_id: 'c563c32c-539f-486a-9be9-3755394640a3',
      type: 'income',
    },
  })
})
