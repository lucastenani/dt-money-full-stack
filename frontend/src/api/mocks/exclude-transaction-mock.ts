import { http, HttpResponse } from 'msw'

import { ErrorResponse } from './get-transactions-mock'

export const excludeTransactionMock = http.patch<
  never,
  never,
  never | ErrorResponse
>('/transactions/:id/exclude', async ({ cookies }) => {
  const authToken = cookies.sessionId
  if (authToken !== 'c563c32c-539f-486a-9be9-3755394640a3') {
    return HttpResponse.json(
      {
        error: 'Unauthorized',
      },
      { status: 401 },
    )
  }

  return HttpResponse.json(null, { status: 200 })
})
