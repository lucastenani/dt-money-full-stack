import { Link } from 'react-router-dom'

export function Error() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-2 p-8">
      <h1 className="text-center text-4xl font-bold">
        Whoops, something happened :(
      </h1>

      <p className="text-center text-accent-foreground">
        Back to{' '}
        <Link className="text-primary hover:underline" to={'/'}>
          home
        </Link>
      </p>
    </main>
  )
}
