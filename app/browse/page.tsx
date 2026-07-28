import type { Metadata } from 'next'
import { CATEGORIES, ENTRIES, type CategoryId } from '@/lib/registry'
import { IndexExplorer } from '@/components/index-explorer'

export const metadata: Metadata = {
  title: 'Browse the index',
  description:
    'Search and filter every UI library, animation kit, shader playground and WebGL tool in the Taste index. Hover any entry for a live preview.',
}

const IDS = CATEGORIES.map((c) => c.id) as CategoryId[]

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ c?: string }>
}) {
  const { c } = await searchParams
  const initialCategory = c && IDS.includes(c as CategoryId) ? (c as CategoryId) : 'all'

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
      <header className="border-b border-border py-12 sm:py-16">
        <p className="label text-brand">Index</p>
        <h1 className="rise mt-3 text-[clamp(2.25rem,6vw,4rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-balance">
          {ENTRIES.length} things worth your attention
        </h1>
        <p className="rise mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground" style={{ '--i': 1 } as React.CSSProperties}>
          Filter by discipline or search by maker, tag or library name. Press
          <kbd className="mx-1.5 rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[11px] text-foreground">
            /
          </kbd>
          to jump into search.
        </p>
      </header>

      <IndexExplorer initialCategory={initialCategory} />

      <div className="h-20" />
    </div>
  )
}
