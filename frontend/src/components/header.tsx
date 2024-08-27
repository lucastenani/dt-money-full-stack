import logoPath from '@/assets/logo.svg'

import { ThemeToggle } from './theme/theme-toggle'
import { Button } from './ui/button'

export function Header() {
  return (
    <header className="bg-background w-screen py-12 lg:py-20">
      <nav className="container flex w-full items-center justify-between md:w-2/3">
        <img
          className="w-full max-w-28 md:max-w-36"
          src={logoPath}
          alt="DT Money Logo"
        />

        <div className="ml-auto flex items-center justify-center gap-2 md:gap-4">
          <ThemeToggle />
          <Button>New transaction</Button>
        </div>
      </nav>
    </header>
  )
}
