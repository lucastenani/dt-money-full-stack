import './globals.css'

import { Header } from './components/header'
import { ThemeProvider } from './components/theme/theme-provider'

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="dt-money-theme">
      <div className="bg-card min-h-screen w-screen font-sans">
        <Header />

        <main></main>
      </div>
    </ThemeProvider>
  )
}
