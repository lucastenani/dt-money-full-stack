import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowCircleDown, ArrowCircleUp } from '@phosphor-icons/react'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

import { Button } from './ui/button'

const newTransactionFormSchema = z.object({
  title: z.string().min(4, 'Please enter more than 4 characters'),
  price: z.number({ message: 'Enter a number' }),
  type: z.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
  })

  function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    console.log(data)
    reset()
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="mb-1 md:mb-4">New transaction</DialogTitle>
      </DialogHeader>

      <form
        className="space-y-2"
        onSubmit={handleSubmit(handleCreateNewTransaction)}
      >
        <Input type="text" placeholder="Title" {...register('title')} />
        {errors.title && (
          <span className="text-destructive md:text-sm">
            {errors.title.message}
          </span>
        )}

        <Input
          type="text"
          placeholder="Price"
          {...register('price', { valueAsNumber: true })}
        />
        {errors.price && (
          <span className="text-destructive md:text-sm">
            {errors.price.message}
          </span>
        )}

        <Controller
          control={control}
          name="type"
          render={({ field }) => {
            return (
              <RadioGroup.Root
                className="grid grid-cols-2 gap-2 md:gap-3"
                onValueChange={field.onChange}
                value={field.value}
              >
                <RadioGroup.Item value="income" asChild>
                  <Button
                    className="peer flex items-center justify-center gap-2 data-[state=checked]:bg-primary"
                    variant={'ghost'}
                    type="button"
                  >
                    <ArrowCircleUp
                      className={
                        field.value === 'income'
                          ? 'text-accent-foreground'
                          : 'text-primary'
                      }
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
                      className={
                        field.value === 'outcome'
                          ? 'text-accent-foreground'
                          : 'text-destructive'
                      }
                      size={24}
                    />
                    Outcome
                  </Button>
                </RadioGroup.Item>
              </RadioGroup.Root>
            )
          }}
        />
        {errors.type && (
          <span className="text-destructive md:text-sm">
            {errors.type.message}
          </span>
        )}

        <Button className="w-full" type="submit" disabled={isSubmitting}>
          Register
        </Button>
      </form>
    </DialogContent>
  )
}
