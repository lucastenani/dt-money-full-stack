import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowCircleDown, ArrowCircleUp } from '@phosphor-icons/react'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { useMutation } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { registerTransaction } from '@/api/register-transaction'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

import { Button } from './ui/button'

const newTransactionFormSchema = z.object({
  title: z.string().min(4, 'Please enter more than 4 characters'),
  price: z.number().min(0, 'Enter a valid number'),
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

  const { mutateAsync: registerTransactionFn } = useMutation({
    mutationFn: registerTransaction,
    onSuccess: () => {
      toast.success('Transaction has been created.')
    },
    onError: () => {
      toast.error('Some unexpected error occurred.')
    },
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    try {
      await registerTransactionFn({
        title: data.title,
        amount: data.price,
        type: data.type,
      })

      reset()
    } catch (error) {}
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="mb-1 md:mb-4">New transaction</DialogTitle>
      </DialogHeader>

      <form
        className="space-y-2 md:space-y-4"
        onSubmit={handleSubmit(handleCreateNewTransaction)}
      >
        <Input
          className={
            errors.title
              ? 'border-destructive focus-visible:ring-destructive'
              : ''
          }
          type="text"
          placeholder="Title"
          {...register('title')}
        />
        {errors.title && (
          <span className="text-destructive md:text-sm">
            {errors.title.message}
          </span>
        )}

        <Input
          className={
            errors.price
              ? 'border-destructive focus-visible:ring-destructive'
              : ''
          }
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
          render={({ field }) => (
            <RadioGroup.Root
              className="grid grid-cols-2 gap-2 md:gap-3"
              onValueChange={field.onChange}
              value={field.value}
            >
              <RadioGroup.Item value="income" asChild>
                <Button
                  className={`flex items-center justify-center gap-2 ${errors.type && 'border border-destructive focus-visible:ring-destructive'} ${field.value === 'income' ? 'bg-primary' : ''}`}
                  variant="ghost"
                  type="button"
                  disabled={isSubmitting}
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
                  className={`flex items-center justify-center gap-2 ${errors.type && 'border border-destructive focus-visible:ring-destructive'} ${field.value === 'outcome' ? 'bg-destructive' : ''}`}
                  variant="ghost"
                  type="button"
                  disabled={isSubmitting}
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
          )}
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
