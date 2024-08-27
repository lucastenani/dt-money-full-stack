import { ArrowCircleDown, ArrowCircleUp } from '@phosphor-icons/react'

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

import { Button } from './ui/button'

export function NewTransactionModal() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="mb-1">New transaction</DialogTitle>
      </DialogHeader>

      <form className="space-y-3">
        <Input type="text" placeholder="Description" />
        <Input type="text" placeholder="Price" />

        <div className="grid grid-cols-2 gap-4">
          <Button
            className="flex items-center justify-center gap-2"
            variant={'ghost'}
          >
            <ArrowCircleUp className="text-primary" size={24} />
            Income
          </Button>
          <Button
            className="flex items-center justify-center gap-2"
            variant={'ghost'}
          >
            <ArrowCircleDown className="text-destructive" size={24} />
            Outcome
          </Button>
        </div>

        <Button className="w-full" type="submit">
          Register
        </Button>
      </form>
    </DialogContent>
  )
}
