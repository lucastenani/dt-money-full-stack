import { api } from '@/lib/axios'

interface excludeTransactionProps {
  transactionId: string
}

export async function excludeTransaction({
  transactionId,
}: excludeTransactionProps) {
  await api.patch(`/transactions/${transactionId}/exclude`)
}
