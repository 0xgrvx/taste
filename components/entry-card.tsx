'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { categoryLabel, type Entry } from '@/lib/registry'
import { usePreview } from '@/components/preview-layer'

function pad(n: number) {
  return String(n + 1).padStart(3, '0')
}

export function EntryCard({ entry, index = 0 }: { entry: Entry; index?: number }) {
  const { show, hide } = usePreview()

  return (
    <Link
      href={`/t/${entry.slug}`}
      onPointerEnter={() => show(entry)}
      onPointerLeave={hide}
      onFocus={hide}
      className="group relative flex min-h-[168px] flex-col justify-between gap-6 border-b border-r border-border p-5 transition-colors duration-200 hover:bg-card focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring"
    >
      <span
        aria-hidden="true"
        className="hatch pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      />

      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="label text-muted-foreground">{pad(index)}</span>
            <span className="label text-brand/80">{categoryLabel(entry.category)}</span>
          </div>
          <h3 className="mt-3 truncate text-[17px] font-semibold tracking-tight">{entry.name}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{entry.tagline}</p>
        </div>
        <ArrowUpRight
          className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-[transform,color] duration-200 ease-[var(--ease-out-strong)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
          aria-hidden="true"
        />
      </div>

      <div className="relative flex flex-wrap items-center gap-1.5">
        {entry.tags.slice(0, 3).map((t) => (
          <span key={t} className="label rounded-sm border border-border px-1.5 py-1 text-muted-foreground">
            {t}
          </span>
        ))}
      </div>
    </Link>
  )
}

export function EntryRow({ entry, index = 0 }: { entry: Entry; index?: number }) {
  const { show, hide } = usePreview()

  return (
    <Link
      href={`/t/${entry.slug}`}
      onPointerEnter={() => show(entry)}
      onPointerLeave={hide}
      onFocus={hide}
      className="group relative flex items-center gap-4 border-b border-border px-3 py-3.5 transition-colors duration-200 hover:bg-card focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring sm:px-4"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-px bg-brand opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      />
      <span className="label w-9 shrink-0 text-muted-foreground">{pad(index)}</span>
      <span className="w-40 shrink-0 truncate text-sm font-medium sm:w-52">{entry.name}</span>
      <span className="hidden min-w-0 flex-1 truncate text-sm text-muted-foreground md:block">{entry.tagline}</span>
      <span className="label ml-auto hidden shrink-0 text-muted-foreground sm:block">
        {categoryLabel(entry.category)}
      </span>
      <ArrowUpRight
        className="h-4 w-4 shrink-0 text-muted-foreground transition-[transform,color] duration-200 ease-[var(--ease-out-strong)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
        aria-hidden="true"
      />
    </Link>
  )
}
