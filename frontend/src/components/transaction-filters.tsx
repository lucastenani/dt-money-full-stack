import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlass, X } from '@phosphor-icons/react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from './ui/button'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

const transactionFiltersSchema = z.object({
  title: z.string().optional(),
  amount: z.string().optional(),
  createdAt: z.string().optional(),
  type: z.string().optional(),
})

type TransactionFiltersSchema = z.infer<typeof transactionFiltersSchema>

export function TransactionFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const title = searchParams.get('title')
  const amount = searchParams.get('amount')
  const createdAt = searchParams.get('created_at')
  const type = searchParams.get('type')

  const { register, handleSubmit, control, reset } =
    useForm<TransactionFiltersSchema>({
      resolver: zodResolver(transactionFiltersSchema),
      defaultValues: {
        title: title ?? '',
        amount: amount ?? '',
        createdAt: createdAt ?? '',
        type: type ?? 'all',
      },
    })

  function handleFilter({
    amount,
    createdAt,
    title,
    type,
  }: TransactionFiltersSchema) {
    setSearchParams((state) => {
      if (amount) {
        state.set('amount', amount)
      } else {
        state.delete('amount')
      }

      if (createdAt) {
        state.set('created_at', createdAt)
      } else {
        state.delete('created_at')
      }

      if (title) {
        state.set('title', title)
      } else {
        state.delete('title')
      }

      if (type) {
        state.set('type', type)
      } else {
        state.delete('type')
      }

      return state
    })
  }

  function handleClearFilters() {
    setSearchParams((state) => {
      state.delete('title')
      state.delete('amount')
      state.delete('created_at')
      state.delete('type')

      return state
    })

    reset({
      createdAt: '',
      amount: '',
      title: '',
      type: 'all',
    })
  }

  return (
    <form
      className="mt-5 grid grid-cols-2 gap-1 md:flex md:flex-row md:items-center"
      onSubmit={handleSubmit(handleFilter)}
    >
      <span className="hidden md:flex">Filters:</span>
      <Input
        placeholder="Title"
        className="col-span-2 h-8"
        {...register('title')}
      />
      <Input
        placeholder="Price"
        className="col-span-2 h-8 md:max-w-32"
        type="number"
        {...register('amount')}
      />

      <Input
        placeholder="Date"
        type="date"
        className="h-8 md:max-w-40"
        {...register('createdAt')}
      />

      <Controller
        name="type"
        control={control}
        render={({ field: { name, onChange, value, disabled } }) => {
          return (
            <Select
              defaultValue="all"
              name={name}
              onValueChange={onChange}
              value={value}
              disabled={disabled}
            >
              <SelectTrigger className="h-8 md:max-w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="outcome">Outcome</SelectItem>
              </SelectContent>
            </Select>
          )
        }}
      />

      <Button className="gap-2" variant="secondary" size="xs" type="submit">
        <MagnifyingGlass className="h-4 w-4" />
        <span>Filter</span>
      </Button>
      <Button
        className="gap-2"
        variant="outline"
        size="xs"
        type="button"
        onClick={handleClearFilters}
      >
        <X className="h-4 w-4" />
        <span> Remove filters</span>
      </Button>
    </form>
  )
}
