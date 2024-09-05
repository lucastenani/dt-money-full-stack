import { toast } from 'sonner'

import { api } from '@/lib/axios'

export interface GetTransactionsParams {
  title?: string | null
  amount?: string | null
  createdAt?: string | null
  type?: string | null
}

export interface GetTransactionsResponse {
  transactions: {
    id: string
    title: string
    amount: number
    type: 'income' | 'outcome'
    created_at: string
    session_id: string
    isExcludedFromBalance: 0 | 1
  }[]
}

export async function getTransactions({
  title,
  amount,
  createdAt,
  type,
}: GetTransactionsParams): Promise<GetTransactionsResponse | null> {
  try {
    const response = await api.get<GetTransactionsResponse>('/transactions', {
      params: {
        title,
        amount,
        createdAt,
        type,
      },
    })

    return response.data
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      toast.info('Make your first transaction')
      console.warn('No transactions found')
      return { transactions: [] }
    }

    throw error
  }
}
