import { Summary } from '@/components/summary'
import { TransactionFilters } from '@/components/transaction-filters'
import { TransactionsTable } from '@/components/transactions-table'

export function Home() {
  return (
    <>
      <Summary />
      <TransactionFilters />
      <TransactionsTable />
    </>
  )
}
