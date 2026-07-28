import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ENTRIES } from '@/lib/registry'
import { Hero } from '@/components/hero'
import { CategoryStrip } from '@/components/category-strip'
import { Picks } from '@/components/picks'
import { MakersMarquee } from '@/components/makers-marquee'
import { EntryRow } from '@/components/entry-card'

export default function Page() {
  const recent = ENTRIES.slice(0, 12)

  return (
    <>
      <Hero />
      <CategoryStrip />
      <Picks />
      <MakersMarquee />

      <section className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-20">
          <header className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="label text-brand">The index</p>
              <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-balance">
                Hover a row. See it running.
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
                Every entry previews live where the site allows embedding, and falls back to a still frame where it
                doesn&apos;t.
              </p>
            </div>
            <Link
              href="/browse"
              className="press inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-medium transition-colors duration-150 hover:bg-card"
            >
              Open the full index
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </header>

          <div className="mt-10 border-t border-border">
            {recent.map((entry, i) => (
              <EntryRow key={entry.slug} entry={entry} index={i} />
            ))}
          </div>

          <Link
            href="/browse"
            className="press label group mt-6 inline-flex items-center gap-2 text-muted-foreground transition-colors duration-150 hover:text-foreground"
          >
            {ENTRIES.length - recent.length} more entries
            <ArrowRight
              className="h-3 w-3 transition-transform duration-200 ease-[var(--ease-out-strong)] group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </section>
    </>
  )
}
