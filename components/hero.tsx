import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CATEGORIES, ENTRIES, MAKER_COUNT } from '@/lib/registry'

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* blueprint backdrop */}
      <div aria-hidden="true" className="blueprint absolute inset-0" />
      <div
        aria-hidden="true"
        className="hatch absolute -left-24 top-0 h-[420px] w-[420px] -rotate-0 border-r border-border"
      />
      <div aria-hidden="true" className="hatch-brand absolute right-10 top-16 hidden h-24 w-24 lg:block" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent"
      />

      <div className="relative mx-auto max-w-[1400px] px-4 pb-16 pt-20 sm:px-6 sm:pt-28">
        <div className="rise" style={{ '--i': 0 } as React.CSSProperties}>
          <Link
            href="/browse"
            className="press group inline-flex items-center gap-2 rounded-full border border-border bg-card/80 py-1 pl-1 pr-3 backdrop-blur-sm transition-colors duration-150 hover:bg-card"
          >
            <span className="label rounded-full bg-primary px-2 py-1 text-primary-foreground">Index</span>
            <span className="label text-muted-foreground">v1 — {ENTRIES.length} entries</span>
            <ArrowRight
              className="h-3 w-3 text-muted-foreground transition-transform duration-200 ease-[var(--ease-out-strong)] group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        <h1
          className="rise mt-8 text-[clamp(3.75rem,13vw,11rem)] font-semibold leading-[0.85] tracking-[-0.05em] text-balance"
          style={{ '--i': 1 } as React.CSSProperties}
        >
          Taste
        </h1>

        <p
          className="wipe label mt-5 max-w-2xl text-[0.8125rem] text-muted-foreground"
          style={{ '--i': 2 } as React.CSSProperties}
        >
          A curated index of UI, motion, shader and WebGL craft
        </p>

        <p
          className="rise mt-6 max-w-xl text-[15px] leading-relaxed text-foreground/75"
          style={{ '--i': 3 } as React.CSSProperties}
        >
          {ENTRIES.length} libraries and tools built by {MAKER_COUNT} people whose work is worth studying. Hover any
          entry for a live preview, copy the install command, then go read their best work.
        </p>

        <div className="rise mt-9 flex flex-wrap items-center gap-3" style={{ '--i': 4 } as React.CSSProperties}>
          <Link
            href="/browse"
            className="press inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors duration-150 hover:bg-primary/90"
          >
            Browse the index
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <Link
            href="#picks"
            className="press inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-card"
          >
            This month&apos;s picks
          </Link>
        </div>

        <div
          className="rise mt-16 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-border pt-6"
          style={{ '--i': 5 } as React.CSSProperties}
        >
          <Stat value={String(ENTRIES.length)} label="entries" />
          <Stat value={String(MAKER_COUNT)} label="makers credited" />
          <Stat value={String(CATEGORIES.length)} label="categories" />
          <p className="label ml-auto hidden max-w-[16rem] text-muted-foreground lg:block">
            11xui // 2026
            <br />
            open curation project
          </p>
        </div>
      </div>
    </section>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="font-mono text-2xl font-medium tracking-tight text-foreground">{value}</span>
      <span className="label text-muted-foreground">{label}</span>
    </div>
  )
}
