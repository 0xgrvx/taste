import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight, ExternalLink, Globe } from 'lucide-react'
import { GitHubIcon, XIcon } from '@/components/icons'
import {
  ENTRIES,
  categoryLabel,
  getEntry,
  previewImage,
  relatedEntries,
  type Maker,
} from '@/lib/registry'
import { InstallCommand } from '@/components/install-command'
import { LiveEmbed } from '@/components/live-embed'
import { EntryCard } from '@/components/entry-card'
import { EntryFavicon } from '@/components/entry-favicon'

export function generateStaticParams() {
  return ENTRIES.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const entry = getEntry(slug)
  if (!entry) return { title: 'Not found' }
  return {
    title: `${entry.name} — ${entry.tagline}`,
    description: entry.description,
    openGraph: { title: `${entry.name} on Taste`, description: entry.tagline },
  }
}

export default async function EntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const entry = getEntry(slug)
  if (!entry) notFound()

  const related = relatedEntries(entry)

  return (
    <article className="mx-auto max-w-[1400px] px-4 sm:px-6">
      <nav className="py-6">
        <Link
          href="/browse"
          className="press label group inline-flex items-center gap-2 text-muted-foreground transition-colors duration-150 hover:text-foreground"
        >
          <ArrowLeft
            className="h-3 w-3 transition-transform duration-200 ease-[var(--ease-out-strong)] group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
          Back to index
        </Link>
      </nav>

      <header className="border-b border-border pb-10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="label rounded-sm border border-brand/40 bg-brand/10 px-2 py-1 text-brand">
            {categoryLabel(entry.category)}
          </span>
          {entry.featured ? <span className="label text-muted-foreground">Editor&apos;s pick</span> : null}
        </div>

        <h1 className="rise mt-5 flex items-center gap-3 text-[clamp(2.5rem,7vw,4.5rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-balance">
          <EntryFavicon url={entry.url} name={entry.name} size={44} className="rounded-[9px]" />
          <span>{entry.name}</span>
        </h1>
        <p
          className="rise mt-4 max-w-2xl text-lg leading-snug tracking-[-0.01em] text-foreground/80 text-pretty"
          style={{ '--i': 1 } as React.CSSProperties}
        >
          {entry.tagline}
        </p>

        <div className="rise mt-8 flex flex-wrap items-center gap-3" style={{ '--i': 2 } as React.CSSProperties}>
          <a
            href={entry.url}
            target="_blank"
            rel="noreferrer noopener"
            className="press inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors duration-150 hover:bg-primary/90"
          >
            Visit site
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          {entry.install ? <InstallCommand install={entry.install} className="min-w-0 flex-1 sm:max-w-md" /> : null}
        </div>
      </header>

      <div className="grid gap-10 py-12 lg:grid-cols-[1.7fr_1fr] lg:gap-12">
        <div className="min-w-0">
          <LiveEmbed
            url={entry.url}
            name={entry.name}
            embeddable={entry.embeddable}
            fallback={previewImage(entry)}
            interactive
          />

          <section className="mt-10">
            <h2 className="label text-brand">What it is</h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-foreground/80">{entry.description}</p>
          </section>

          <section className="mt-12">
            <h2 className="label text-brand">Best work</h2>
            <ul className="mt-4 border-t border-border">
              {entry.best.map((w) => (
                <li key={w.url}>
                  <a
                    href={w.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex items-start gap-4 border-b border-border py-4 transition-colors duration-200 hover:bg-card focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-[15px] font-medium tracking-tight">{w.title}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{w.note}</p>
                    </div>
                    <ArrowUpRight
                      className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-[transform,color] duration-200 ease-[var(--ease-out-strong)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* meta rail */}
        <aside className="min-w-0 lg:sticky lg:top-20 lg:self-start">
          <section>
            <h2 className="label text-brand">Makers</h2>
            <ul className="mt-4 grid gap-3">
              {entry.makers.map((m) => (
                <li key={m.name}>
                  <MakerCard maker={m} />
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="label text-brand">Tags</h2>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {entry.tags.map((t) => (
                <span key={t} className="label rounded-sm border border-border px-2 py-1 text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
          </section>

          <dl className="mt-10 border-t border-border">
            <MetaRow label="Category" value={categoryLabel(entry.category)} />
            <MetaRow
              label="Install"
              value={entry.install ? `${entry.install.type} · ${entry.install.target}` : 'No package'}
            />
            <MetaRow label="Live preview" value={entry.embeddable ? 'Embeddable' : 'Blocked by site'} />
          </dl>
        </aside>
      </div>

      {related.length ? (
        <section className="border-t border-border py-12">
          <h2 className="label text-brand">Adjacent taste</h2>
          <div className="mt-6 grid grid-cols-1 border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r, i) => (
              <EntryCard key={r.slug} entry={r} index={i} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  )
}

function MakerCard({ maker }: { maker: Maker }) {
  return (
    <div className="rounded-md border border-border bg-card p-4">
      <p className="text-[15px] font-medium tracking-tight">{maker.name}</p>
      {maker.role ? <p className="label mt-1 text-muted-foreground">{maker.role}</p> : null}

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {maker.x ? (
          <SocialLink href={`https://x.com/${maker.x}`} label={`@${maker.x} on X`}>
            <XIcon />@{maker.x}
          </SocialLink>
        ) : null}
        {maker.github ? (
          <SocialLink href={`https://github.com/${maker.github}`} label={`${maker.github} on GitHub`}>
            <GitHubIcon className="h-3 w-3" />
            {maker.github}
          </SocialLink>
        ) : null}
        {maker.site ? (
          <SocialLink href={maker.site} label={`${maker.name} personal site`}>
            <Globe className="h-3 w-3" aria-hidden="true" />
            site
          </SocialLink>
        ) : null}
      </div>
    </div>
  )
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={label}
      className="press label inline-flex items-center gap-1.5 rounded-sm border border-border px-2 py-1.5 text-muted-foreground transition-colors duration-150 hover:border-brand/40 hover:text-foreground"
    >
      {children}
    </a>
  )
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-border py-3">
      <dt className="label text-muted-foreground">{label}</dt>
      <dd className="font-mono text-xs text-foreground/85">{value}</dd>
    </div>
  )
}
