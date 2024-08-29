import './globals.css'

import { QueryClientProvider } from '@tanstack/react-query'

import { Toaster } from '@/components/ui/sonner'

import { Header } from './components/header'
import { Summary } from './components/summary'
import { ThemeProvider } from './components/theme/theme-provider'
import { TransactionFilters } from './components/transaction-filters'
import { TransactionsTable } from './components/transactions-table'
import { queryClient } from './lib/react-query'

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="dt-money-theme">
      <QueryClientProvider client={queryClient}>
        <Toaster richColors />
        <div className="min-h-screen w-screen bg-card font-sans">
          <Header />

          <main className="-mt-8 flex w-full flex-col px-1 md:container md:-mt-14 md:w-[90%] md:space-y-12 lg:-mt-20 lg:w-2/3">
            <Summary />
            <TransactionFilters />
            <TransactionsTable />
          </main>
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
