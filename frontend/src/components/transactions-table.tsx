import { MagnifyingGlass } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { enUS } from 'date-fns/locale'

import { getTransactions } from '@/api/get-transactions'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { TransactionDetails } from './transaction-details'
import { Dialog, DialogTrigger } from './ui/dialog'

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
          <TableHead></TableHead>
          <TableHead className="md:w-1/2">Title</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-right">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {result &&
          result.transactions.map((transaction) => {
            return (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant={'outline'} size={'sm'}>
                        <MagnifyingGlass className="h-3 w-3 md:h-4 md:w-4" />
                        <span className="sr-only">Transaction Details</span>
                      </Button>
                    </DialogTrigger>

                    <TransactionDetails transactionId={transaction.id} />
                  </Dialog>
                </TableCell>
                <TableCell className="font-medium capitalize">
                  {transaction.title}
                </TableCell>
                <TableCell
                  className={
                    transaction.type === 'income'
                      ? 'text-primary'
                      : 'text-destructive'
                  }
                >
                  {transaction.amount.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
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
