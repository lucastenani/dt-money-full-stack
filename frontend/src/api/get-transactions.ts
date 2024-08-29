import { api } from '@/lib/axios'

interface GetTransactionsResponse {
  total: number
  transactions: {
    id: string
    title: string
    amount: number
    type: 'income' | 'outcome'
    created_at: string
    session_id: string
  }[]
}

export async function getTransactions() {
  const response = await api.get<GetTransactionsResponse>('/transactions')

  return response.data
}
