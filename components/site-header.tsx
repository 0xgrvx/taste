import Link from 'next/link'
import { Github } from 'lucide-react'
import { CATEGORIES } from '@/lib/registry'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-6 px-4 sm:px-6">
        <Link
          href="/"
          className="press flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <span
            aria-hidden="true"
            className="hatch-brand flex h-5 w-5 items-center justify-center rounded-[3px] border border-brand/40"
          />
          <span className="text-[15px] font-semibold tracking-tight">Taste</span>
        </Link>

        <nav aria-label="Categories" className="hidden items-center gap-1 md:flex">
          <Link
            href="/browse"
            className="label rounded-sm px-2.5 py-1.5 text-muted-foreground transition-colors duration-150 hover:text-foreground"
          >
            Index
          </Link>
          {CATEGORIES.map((c) => (
            <Link
              key={c.id}
              href={`/browse?c=${c.id}`}
              className="label rounded-sm px-2.5 py-1.5 text-muted-foreground transition-colors duration-150 hover:text-foreground"
            >
              {c.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <span className="label hidden text-muted-foreground sm:inline">taste.11xui.com</span>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub"
            className="press flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors duration-150 hover:bg-muted/60 hover:text-foreground"
          >
            <Github className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <Link
            href="/browse"
            className="press hidden rounded-md bg-primary px-3 py-1.5 text-[13px] font-medium text-primary-foreground transition-colors duration-150 hover:bg-primary/90 sm:inline-block"
          >
            Browse
          </Link>
        </div>
      </div>
    </header>
  )
}
