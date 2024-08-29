import { MagnifyingGlass, X } from '@phosphor-icons/react'

import { Button } from './ui/button'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

export function TransactionFilters() {
  return (
    <form className="flex flex-col items-center gap-1 md:flex-row">
      <span>Filters:</span>
      <Input placeholder="Title" className="h-8" />
      <Input placeholder="Price" className="h-8 md:max-w-32" />
      <Input placeholder="Date" className="h-8 md:max-w-32" />
      <Select defaultValue="all">
        <SelectTrigger className="h-8 md:max-w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="income">Income</SelectItem>
          <SelectItem value="outcome">Outcome</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="secondary" size="xs" type="submit">
        <MagnifyingGlass className="h-4 w-4" />
        <span className="sr-only">Filter</span>
      </Button>
      <Button variant="outline" size="xs" type="button">
        <X className="h-4 w-4" />
        <span className="sr-only"> Remove filters</span>
      </Button>
    </form>
  )
}
