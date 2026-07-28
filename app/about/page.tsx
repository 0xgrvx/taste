import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CATEGORIES, ENTRIES, MAKER_COUNT } from '@/lib/registry'

export const metadata: Metadata = {
  title: 'What gets listed',
  description:
    'The curation rules behind Taste: how entries are chosen, why previews sometimes fall back to stills, and how makers are credited.',
}

const RULES = [
  {
    title: 'Craft over popularity',
    body: 'Stars are a lagging indicator. An entry earns a place because the details are right — the easing, the focus ring, the empty state, the docs.',
  },
  {
    title: 'The maker is the unit',
    body: 'Every entry credits the people who built it, with links to their socials and one or two other things they made. Follow the person, not just the repo.',
  },
  {
    title: 'Previews are honest',
    body: 'Hovering an entry loads the real site in a sandboxed frame. When a site blocks embedding, you get a still frame and a clear label instead of a blank rectangle.',
  },
  {
    title: 'Install in one copy',
    body: 'Where a package or registry item exists, the exact command is one click away in your package manager of choice.',
  },
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
      <header className="border-b border-border py-12 sm:py-16">
        <p className="label text-brand">About</p>
        <h1 className="rise mt-3 max-w-3xl text-[clamp(2.25rem,6vw,4rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-balance">
          Taste is a reading list, not a ranking
        </h1>
        <p
          className="rise mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground"
          style={{ '--i': 1 } as React.CSSProperties}
        >
          {ENTRIES.length} entries across {CATEGORIES.length} disciplines, {MAKER_COUNT} makers credited. Hand-picked,
          reviewed by hand, and updated when something genuinely better shows up.
        </p>
      </header>

      <div className="grid gap-px border-b border-border bg-border sm:grid-cols-2">
        {RULES.map((r) => (
          <section key={r.title} className="bg-background p-6 sm:p-8">
            <h2 className="text-[17px] font-semibold tracking-tight">{r.title}</h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{r.body}</p>
          </section>
        ))}
      </div>

      <section className="py-16">
        <h2 className="label text-brand">Suggest something</h2>
        <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-foreground/80">
          Found a library or a shader playground that belongs here? The index grows by recommendation — send it over
          with a note on what makes it good.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href="https://x.com/intent/tweet?text=%40taste%20add%20this%20to%20the%20index%3A%20"
            target="_blank"
            rel="noreferrer noopener"
            className="press inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors duration-150 hover:bg-primary/90"
          >
            Send a suggestion
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <Link
            href="/browse"
            className="press inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-medium transition-colors duration-150 hover:bg-card"
          >
            Browse the index
          </Link>
        </div>
      </section>
    </div>
  )
}
