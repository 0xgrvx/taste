import { ENTRIES } from '@/lib/registry'

function uniqueMakers() {
  const seen = new Map<string, string>()
  for (const entry of ENTRIES) {
    for (const maker of entry.makers) {
      if (!seen.has(maker.name)) seen.set(maker.name, entry.name)
    }
  }
  return [...seen.entries()].map(([name, project]) => ({ name, project }))
}

export function MakersMarquee() {
  const makers = uniqueMakers()
  const track = [...makers, ...makers]

  return (
    <section aria-label="Makers credited in the index" className="border-b border-border py-10">
      <p className="label mx-auto max-w-[1400px] px-4 text-muted-foreground sm:px-6">
        Built by
        <span className="ml-2 text-foreground/80">{makers.length} people</span>
      </p>

      <div className="group relative mt-6 overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent"
        />

        <div
          className="marquee-track flex w-max items-center gap-8 group-hover:[animation-play-state:paused]"
          style={{ '--speed': '64s' } as React.CSSProperties}
        >
          {track.map((m, i) => (
            <span key={`${m.name}-${i}`} className="flex shrink-0 items-baseline gap-2.5">
              <span className="text-[15px] tracking-tight text-foreground/85">{m.name}</span>
              <span className="label text-muted-foreground/70">{m.project}</span>
              <span aria-hidden="true" className="ml-6 h-1 w-1 rounded-full bg-brand/50" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
