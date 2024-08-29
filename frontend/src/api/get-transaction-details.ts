import { api } from '@/lib/axios'

interface GetTransactionDetailsParams {
  transactionId: string
}

interface GetTransactionDetailsResponse {
  transaction: {
    id: string
    title: string
    amount: number
    type: 'income' | 'outcome'
    created_at: string
    session_id: string
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
