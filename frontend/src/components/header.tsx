import logoPath from '@/assets/logo.svg'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import { NewTransactionModal } from './new-transaction-modal'
import { ThemeToggle } from './theme/theme-toggle'
import { Button } from './ui/button'

export function Header() {
  return (
    <header className="w-screen bg-muted-foreground py-12 dark:bg-background md:py-32">
      <nav className="flex w-full items-center justify-between px-1 md:container md:w-[90%] lg:w-2/3">
        <img
          className="w-full max-w-28 md:max-w-36"
          src={logoPath}
          alt="DT Money Logo"
        />

        <div className="ml-auto flex items-center justify-center gap-2 md:gap-4">
          <ThemeToggle />

          <Dialog>
            <DialogTrigger asChild>
              <Button>New transaction</Button>
            </DialogTrigger>
            <NewTransactionModal />
          </Dialog>
        </div>
      </nav>
    </header>
  )
}
