import { ArrowCircleDown, ArrowCircleUp } from '@phosphor-icons/react'
import * as RadioGroup from '@radix-ui/react-radio-group'

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
        <DialogTitle className="mb-1 md:mb-4">New transaction</DialogTitle>
      </DialogHeader>

      <form className="space-y-3 md:space-y-4">
        <Input type="text" placeholder="Description" />
        <Input type="text" placeholder="Price" />

        <RadioGroup.Root className="grid grid-cols-2 gap-2 md:gap-3">
          <RadioGroup.Item value="income" asChild>
            <Button
              className="peer flex items-center justify-center gap-2 data-[state=checked]:bg-primary"
              variant={'ghost'}
              type="button"
            >
              <ArrowCircleUp
                className="text-primary peer-data-[state=checked]:text-white"
                size={24}
              />
              Income
            </Button>
          </RadioGroup.Item>

          <RadioGroup.Item value="outcome" asChild>
            <Button
              className="peer flex items-center justify-center gap-2 data-[state=checked]:bg-destructive"
              variant={'ghost'}
              type="button"
            >
              <ArrowCircleDown
                className="text-destructive peer-data-[state=checked]:text-white"
                size={24}
              />
              Outcome
            </Button>
          </RadioGroup.Item>
        </RadioGroup.Root>

        <Button className="w-full" type="submit">
          Register
        </Button>
      </form>
    </DialogContent>
  )
}
