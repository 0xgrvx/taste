import Link from 'next/link'
import { CATEGORIES, ENTRIES } from '@/lib/registry'

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="hatch-brand flex h-5 w-5 items-center justify-center rounded-[3px] border border-brand/40"
              />
              <span className="text-[15px] font-semibold tracking-tight">Taste</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              A curated index of the UI libraries, motion kits, shaders and WebGL tools worth your attention — and the
              people who made them.
            </p>
            <p className="label mt-6 text-muted-foreground">taste.11xui.com</p>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3 lg:max-w-2xl">
            <div>
              <h2 className="label text-muted-foreground">Categories</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {CATEGORIES.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/browse?c=${c.id}`}
                      className="text-sm text-foreground/70 transition-colors duration-150 hover:text-foreground"
                    >
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="label text-muted-foreground">Picks</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {ENTRIES.filter((e) => e.featured)
                  .slice(0, 6)
                  .map((e) => (
                    <li key={e.slug}>
                      <Link
                        href={`/t/${e.slug}`}
                        className="text-sm text-foreground/70 transition-colors duration-150 hover:text-foreground"
                      >
                        {e.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>

            <div>
              <h2 className="label text-muted-foreground">This site</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                <li>
                  <Link
                    href="/browse"
                    className="text-sm text-foreground/70 transition-colors duration-150 hover:text-foreground"
                  >
                    Full index
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-foreground/70 transition-colors duration-150 hover:text-foreground"
                  >
                    What gets listed
                  </Link>
                </li>
                <li>
                  <a
                    href="https://11xui.com"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-sm text-foreground/70 transition-colors duration-150 hover:text-foreground"
                  >
                    11xui
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label text-muted-foreground">
            {ENTRIES.length} entries — curated, not scraped
          </p>
          <p className="label text-muted-foreground">Every project belongs to its makers</p>
        </div>
      </div>
    </footer>
  )
}
