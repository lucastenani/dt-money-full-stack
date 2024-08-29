import './globals.css'

import { QueryClientProvider } from '@tanstack/react-query'

import { Toaster } from '@/components/ui/sonner'

import { Header } from './components/header'
import { ThemeProvider } from './components/theme/theme-provider'
import { TransactionsTable } from './components/transactions-table'
import { queryClient } from './lib/react-query'

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="dt-money-theme">
      <QueryClientProvider client={queryClient}>
        <Toaster richColors />
        <div className="min-h-screen w-screen bg-card font-sans">
          <Header />

          <main className="flex w-full flex-col px-1 md:container md:-mt-14 md:w-2/3 lg:-mt-20">
            <TransactionsTable />
          </main>
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
