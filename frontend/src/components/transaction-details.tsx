import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'

import { getTransactionDetails } from '@/api/get-transaction-details'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { Table, TableBody, TableCell, TableRow } from './ui/table'

interface TransactionDetailsProps {
  transactionId: string
  open: boolean
}

export function TransactionDetails({
  transactionId,
  open,
}: TransactionDetailsProps) {
  const { data: transaction } = useQuery({
    queryKey: ['transaction', transactionId],
    queryFn: () => getTransactionDetails({ transactionId }),
    enabled: open,
  })

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Transaction: {transactionId}</DialogTitle>
        <DialogDescription>Transaction details</DialogDescription>
      </DialogHeader>

      {transaction && (
        <div className="space-y-6">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground">Title</TableCell>
                <TableCell className="flex justify-end capitalize">
                  {transaction.title}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Type</TableCell>
                <TableCell className="flex justify-end capitalize">
                  {transaction.type}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Amount</TableCell>
                <TableCell className="flex justify-end capitalize">
                  {transaction.amount.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">
                  Date created
                </TableCell>
                <TableCell className="flex justify-end capitalize">
                  {format(
                    new Date(transaction.created_at),
                    'MM/dd/yyyy hh:mm:ss a',
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}
    </DialogContent>
  )
}
