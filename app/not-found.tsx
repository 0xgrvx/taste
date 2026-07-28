import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-[1400px] flex-col justify-center px-4 sm:px-6">
      <p className="label text-brand">404</p>
      <h1 className="mt-4 text-[clamp(2.25rem,6vw,4rem)] font-semibold leading-[0.95] tracking-[-0.04em]">
        Not in the index
      </h1>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
        That entry either moved or was never curated. The full list is one click away.
      </p>
      <Link
        href="/browse"
        className="press mt-8 inline-flex w-fit items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors duration-150 hover:bg-primary/90"
      >
        Browse the index
        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
    </div>
  )
}
