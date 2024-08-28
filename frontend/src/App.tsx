import './globals.css'

import { QueryClientProvider } from '@tanstack/react-query'

import { Toaster } from '@/components/ui/sonner'

import { Header } from './components/header'
import { ThemeProvider } from './components/theme/theme-provider'
import { queryClient } from './lib/react-query'

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="dt-money-theme">
      <QueryClientProvider client={queryClient}>
        <Toaster richColors />
        <div className="min-h-screen w-screen bg-card font-sans">
          <Header />

          <main></main>
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
