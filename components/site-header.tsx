import Link from 'next/link'
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
        <span className="hidden text-[11px] text-muted-foreground/50 sm:inline">
          by{' '}
          <a
            href="https://x.com/intent/follow?screen_name=gauravmandall"
            target="_blank"
            rel="noreferrer noopener"
            className="underline decoration-muted-foreground/20 underline-offset-2 transition-colors duration-150 hover:text-muted-foreground/90"
          >
            gauravmandall
          </a>
        </span>

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
        </div>
      </div>
    </header>
  )
}
