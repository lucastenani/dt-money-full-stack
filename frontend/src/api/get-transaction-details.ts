import { api } from '@/lib/axios'

export interface GetTransactionDetailsParams {
  transactionId: string
}

export interface GetTransactionDetailsResponse {
  transaction: {
    id: string
    title: string
    amount: number
    type: 'income' | 'outcome'
    created_at: string
    session_id: string
    isExcludedFromBalance: 0 | 1
  }
}

export async function getTransactionDetails({
  transactionId,
}: GetTransactionDetailsParams) {
  const response = await api.get<GetTransactionDetailsResponse>(
    `/transactions/${transactionId}`,
  )

  return response.data.transaction
}
