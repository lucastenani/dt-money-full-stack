import { api } from '@/lib/axios'

interface GetTransactionsParams {
  title?: string | null
  amount?: string | null
  createdAt?: string | null
  type?: string | null
}

interface GetTransactionsResponse {
  transactions: {
    id: string
    title: string
    amount: number
    type: 'income' | 'outcome'
    created_at: string
    session_id: string
  }[]
}

export async function getTransactions({
  title,
  amount,
  createdAt,
  type,
}: GetTransactionsParams) {
  const response = await api.get<GetTransactionsResponse>('/transactions', {
    params: {
      title,
      amount,
      createdAt,
      type,
    },
  })

  return response.data
}
