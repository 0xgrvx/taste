'use client'

import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { categoryLabel, type Entry } from '@/lib/registry'
import { usePreview } from '@/components/preview-layer'
import { EntryFavicon } from '@/components/entry-favicon'

function pad(n: number) {
  return String(n + 1).padStart(3, '0')
}

export function EntryCard({ entry, index = 0 }: { entry: Entry; index?: number }) {
  const { show, hide } = usePreview()

  return (
    <div className="group relative flex min-h-[168px] flex-col justify-between gap-6 border-b border-r border-border p-5 transition-colors duration-200 hover:bg-card">
      <Link
        href={`/t/${entry.slug}`}
        onPointerEnter={(e) => show(entry, e)}
        onPointerLeave={hide}
        onFocus={hide}
        aria-label={`Open ${entry.name}`}
        className="absolute inset-0 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring"
      />

      <span
        aria-hidden="true"
        className="hatch pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      />

      <div className="pointer-events-none flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="label text-muted-foreground">{pad(index)}</span>
            <span className="label text-brand/80">{categoryLabel(entry.category)}</span>
          </div>
          <h3 className="mt-3 flex items-center gap-2.5 truncate text-[17px] font-semibold tracking-tight">
            <EntryFavicon url={entry.url} name={entry.name} size={24} />
            <span className="truncate">{entry.name}</span>
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{entry.tagline}</p>
        </div>
        <a
          href={entry.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${entry.name} website`}
          title={`Visit ${entry.name}`}
          className="pointer-events-auto relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border border-border bg-background/70 text-muted-foreground transition-colors duration-150 hover:border-brand/50 hover:text-brand"
        >
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>

      <div className="pointer-events-none flex flex-wrap items-center gap-1.5">
        {entry.tags.slice(0, 3).map((t) => (
          <span key={t} className="label rounded-sm border border-border px-1.5 py-1 text-muted-foreground">
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

export function EntryRow({ entry, index = 0 }: { entry: Entry; index?: number }) {
  const { show, hide } = usePreview()

  return (
    <div className="group relative flex items-center gap-4 border-b border-border px-3 py-3.5 transition-colors duration-200 hover:bg-card sm:px-4">
      <Link
        href={`/t/${entry.slug}`}
        onPointerEnter={(e) => show(entry, e)}
        onPointerLeave={hide}
        onFocus={hide}
        aria-label={`Open ${entry.name}`}
        className="absolute inset-0 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-px bg-brand opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      />
      <span className="label w-9 shrink-0 text-muted-foreground">{pad(index)}</span>
      <EntryFavicon url={entry.url} name={entry.name} size={20} />
      <span className="w-40 shrink-0 truncate text-sm font-medium sm:w-52">{entry.name}</span>
      <span className="hidden min-w-0 flex-1 truncate text-sm text-muted-foreground md:block">{entry.tagline}</span>
      <span className="label ml-auto hidden shrink-0 text-muted-foreground sm:block">
        {categoryLabel(entry.category)}
      </span>
      <a
        href={entry.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${entry.name} website`}
        title={`Visit ${entry.name}`}
        className="pointer-events-auto relative z-10 flex h-8 shrink-0 items-center gap-1.5 rounded-sm border border-border bg-background/70 px-2.5 text-xs text-foreground transition-colors duration-150 hover:border-brand/50 hover:text-brand"
      >
        Visit
        <ExternalLink className="h-3 w-3" aria-hidden="true" />
      </a>
    </div>
  )
}
