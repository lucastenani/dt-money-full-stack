import { api } from '@/lib/axios'

interface RegisterTransactionBody {
  title: string
  amount: number
  type: 'income' | 'outcome'
}

export async function registerTransaction({
  title,
  amount,
  type,
}: RegisterTransactionBody) {
  await api.post('/transactions', { title, amount, type })
}
