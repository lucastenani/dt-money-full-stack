import { http, HttpResponse } from 'msw'

import { RegisterTransactionBody } from '../register-transaction'

export const registerTransactionMock = http.post<
  never,
  RegisterTransactionBody
>('/transactions', async ({ request }) => {
  const { title } = await request.json()

  if (title === 'New Title') {
    return new HttpResponse(null, {
      status: 201,
      headers: {
        'Set-Cookie': 'sessionId=c563c32c-539f-486a-9be9-3755394640a3',
      },
    })
  }

  return new HttpResponse(null, { status: 400 })
})
