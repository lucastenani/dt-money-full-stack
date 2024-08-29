import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { enUS } from 'date-fns/locale'

import { getTransactions } from '@/api/get-transactions'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function TransactionsTable() {
  const { data: result } = useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactions,
  })

  return (
    <Table>
      <TableCaption>A list of your recent transactions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="md:w-1/2">Title</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-right">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {result &&
          result.transactions.map((transaction) => {
            return (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">
                  {transaction.title}
                </TableCell>
                <TableCell
                  className={
                    transaction.type === 'income'
                      ? 'text-primary'
                      : 'text-destructive'
                  }
                >
                  {transaction.amount.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </TableCell>
                <TableCell className="font-medium capitalize">
                  {transaction.type}
                </TableCell>
                <TableCell className="text-right">
                  {formatDistanceToNow(transaction.created_at, {
                    locale: enUS,
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            )
          })}
      </TableBody>
    </Table>
  )
}
