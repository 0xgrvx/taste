import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CATEGORIES, byCategory } from '@/lib/registry'

export function CategoryStrip() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2 lg:grid-cols-5">
          {CATEGORIES.map((c) => {
            const count = byCategory(c.id).length
            return (
              <Link
                key={c.id}
                href={`/browse?c=${c.id}`}
                className="group relative flex flex-col gap-3 bg-background p-6 transition-colors duration-200 hover:bg-card focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px scale-x-0 bg-brand transition-transform duration-300 ease-[var(--ease-out-strong)] group-hover:scale-x-100"
                />
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-medium tracking-tight">{c.label}</span>
                  <span className="font-mono text-xs text-muted-foreground">{String(count).padStart(2, '0')}</span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{c.blurb}</p>
                <ArrowRight
                  className="mt-1 h-3.5 w-3.5 text-muted-foreground transition-[transform,color] duration-200 ease-[var(--ease-out-strong)] group-hover:translate-x-1 group-hover:text-brand"
                  aria-hidden="true"
                />
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
