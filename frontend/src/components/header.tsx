import logoPath from '@/assets/logo.svg'

import { Button } from './ui/button'

export function Header() {
  return (
    <header className="bg-background w-screen py-12">
      <div className="container flex w-full items-center justify-between md:w-2/3">
        <img
          className="w-full max-w-28 md:max-w-36"
          src={logoPath}
          alt="DT Money Logo"
        />

        <div className="flex items-center justify-center gap-4 md:gap-8">
          <Button>New transaction</Button>
        </div>
      </div>
    </header>
  )
}
