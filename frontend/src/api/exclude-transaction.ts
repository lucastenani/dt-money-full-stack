import { api } from '@/lib/axios'

export interface ExcludeTransactionProps {
  transactionId: string
}

export async function excludeTransaction({
  transactionId,
}: ExcludeTransactionProps) {
  await api.patch(`/transactions/${transactionId}/exclude`)
}
