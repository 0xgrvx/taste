import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { FEATURED, categoryLabel, previewImage } from '@/lib/registry'
import { InstallCommand } from '@/components/install-command'
import { PreviewTrigger } from '@/components/preview-trigger'
import { LiveEmbed } from '@/components/live-embed'
import { EntryFavicon } from '@/components/entry-favicon'

export function Picks() {
  const [lead, ...rest] = FEATURED.slice(0, 7)

  return (
    <section id="picks" className="scroll-mt-14 border-b border-border">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-20">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="label text-brand">Editor&apos;s picks</p>
            <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-balance">
              Start with the ones that changed how people build
            </h2>
          </div>
          <Link
            href="/browse"
            className="press label inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-muted-foreground transition-colors duration-150 hover:bg-card hover:text-foreground"
          >
            See all entries
            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </Link>
        </header>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1.15fr_1fr]">
          {/* lead card */}
          {lead ? (
            <PreviewTrigger
              entry={lead}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card"
            >
              <Link
                href={`/t/${lead.slug}`}
                className="relative block aspect-[16/9] overflow-hidden border-b border-border bg-background focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring"
              >
                <img
                  src={previewImage(lead) || '/placeholder.svg'}
                  alt={`${lead.name} interface preview`}
                  className="absolute inset-0 h-full w-full object-cover opacity-70 transition-[transform,opacity] duration-500 ease-[var(--ease-out-strong)] group-hover:scale-[1.02] group-hover:opacity-100"
                />
                {lead.embeddable ? <LiveEmbed url={lead.url} className="absolute inset-0" /> : null}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card to-transparent"
                />
              </Link>

              <div className="flex flex-1 flex-col gap-4 p-5">
                <div className="flex items-center gap-2">
                  <span className="label text-brand">{categoryLabel(lead.category)}</span>
                  <span className="label text-muted-foreground">{lead.makers[0]?.name}</span>
                </div>
                <div>
                  <Link
                    href={`/t/${lead.slug}`}
                    className="inline-flex items-center gap-2.5 text-xl font-semibold tracking-tight underline-offset-4 hover:underline"
                  >
                    <EntryFavicon url={lead.url} name={lead.name} size={26} />
                    {lead.name}
                  </Link>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{lead.description}</p>
                </div>
                {lead.install ? <InstallCommand install={lead.install} className="mt-auto" /> : null}
              </div>
            </PreviewTrigger>
          ) : null}

          {/* stacked list */}
          <ul className="grid gap-4 sm:grid-cols-2 lg:content-start">
            {rest.map((entry) => (
              <li key={entry.slug}>
                <PreviewTrigger entry={entry} className="h-full">
                  <Link
                    href={`/t/${entry.slug}`}
                    className="group flex h-full flex-col gap-3 rounded-lg border border-border bg-card p-4 transition-colors duration-200 hover:border-brand/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="label text-muted-foreground">{categoryLabel(entry.category)}</span>
                      <ArrowUpRight
                        className="h-3.5 w-3.5 text-muted-foreground transition-[transform,color] duration-200 ease-[var(--ease-out-strong)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="flex items-center gap-2 text-[15px] font-medium tracking-tight">
                      <EntryFavicon url={entry.url} name={entry.name} size={20} />
                      <span className="truncate">{entry.name}</span>
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">{entry.tagline}</p>
                    <p className="label mt-auto text-muted-foreground/80">
                      {entry.makers.map((m) => m.name).join(' · ')}
                    </p>
                  </Link>
                </PreviewTrigger>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
