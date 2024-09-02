import { MagnifyingGlass, Plus, Trash } from '@phosphor-icons/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

import { excludeTransaction } from '@/api/exclude-transaction'
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
import { queryClient } from '@/lib/react-query'

import { TransactionDetails } from './transaction-details'
import { Dialog, DialogTrigger } from './ui/dialog'

export function TransactionsTable() {
  const [searchParams] = useSearchParams()
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false)

  const title = searchParams.get('title')
  const amount = searchParams.get('amount')
  const createdAt = searchParams.get('created_at')
  const type = searchParams.get('type')

  const { data: result } = useQuery({
    queryKey: ['transactions', title, amount, createdAt, type],
    queryFn: () =>
      getTransactions({
        title,
        amount,
        createdAt,
        type: type === 'all' ? null : type,
      }),
  })

  const { mutateAsync: excludeFromSummaryFn } = useMutation({
    mutationFn: excludeTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['summary'] })
      toast.success('Transaction has been excluded.')
    },
    onError: () => {
      toast.error('Some unexpected error occurred.')
    },
  })

  function handleExcludeFromSummary(transactionId: string) {
    try {
      excludeFromSummaryFn({ transactionId })
    } catch (error) {}
  }

  return (
    <Table>
      <TableCaption>A list of your recent transactions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="md:w-1/2">Title</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {result &&
          result.transactions.map((transaction) => {
            const isInSummary = transaction.isExcludedFromBalance === 1
            return (
              <TableRow key={transaction.id}>
                <TableCell
                  className={`font-medium capitalize ${isInSummary && 'text-muted-foreground line-through'}`}
                >
                  {transaction.title}
                </TableCell>
                <TableCell
                  className={
                    isInSummary
                      ? 'text-muted-foreground line-through'
                      : transaction.type === 'income'
                        ? 'text-primary'
                        : 'text-destructive'
                  }
                >
                  {transaction.amount.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </TableCell>

                <TableCell
                  className={
                    isInSummary
                      ? 'text-muted-foreground line-through'
                      : undefined
                  }
                >
                  {formatDistanceToNow(transaction.created_at, {
                    locale: enUS,
                    addSuffix: true,
                  })}
                </TableCell>
                <TableCell className="flex items-center justify-end gap-2 font-medium">
                  <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant={'outline'}
                        size={'sm'}
                        className="lg:flex lg:items-center lg:justify-center lg:gap-1"
                      >
                        <MagnifyingGlass className="h-3 w-3 md:h-4 md:w-4" />
                        <span className="hidden lg:flex">Details</span>
                      </Button>
                    </DialogTrigger>

                    <TransactionDetails
                      transactionId={transaction.id}
                      open={isDetailsOpen}
                    />
                  </Dialog>
                  <Button
                    variant={'outline'}
                    size={'sm'}
                    className="lg:flex lg:w-[150px] lg:items-center lg:justify-center lg:gap-1"
                    onClick={() => handleExcludeFromSummary(transaction.id)}
                  >
                    {isInSummary ? (
                      <Plus className="h-3 w-3 md:h-4 md:w-4" />
                    ) : (
                      <Trash className="h-3 w-3 md:h-4 md:w-4" />
                    )}
                    <span className="hidden lg:flex">
                      {isInSummary ? 'Add to summary' : 'Delete to summary'}
                    </span>
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
      </TableBody>
    </Table>
  )
}
