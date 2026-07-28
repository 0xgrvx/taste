'use client'

import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Monitor, Smartphone } from 'lucide-react'
import { cn } from '@/lib/utils'

type Device = 'desktop' | 'mobile'

const WIDTHS: Record<Device, number> = { desktop: 1440, mobile: 420 }

export function LiveEmbed({
  url,
  name,
  embeddable,
  fallback,
}: {
  url: string
  name: string
  embeddable: boolean
  fallback: string
}) {
  const [device, setDevice] = useState<Device>('desktop')
  const [live, setLive] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const shellRef = useRef<HTMLDivElement | null>(null)
  const [shellWidth, setShellWidth] = useState(0)

  useEffect(() => {
    const el = shellRef.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setShellWidth(e.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // if the frame never reports a load, treat it as blocked
  useEffect(() => {
    if (!live || loaded) return
    const t = setTimeout(() => setFailed(true), 6000)
    return () => clearTimeout(t)
  }, [live, loaded])

  const frameWidth = WIDTHS[device]
  const scale = shellWidth ? Math.min(shellWidth / frameWidth, 1) : 1
  const showFrame = embeddable && live && !failed
  const host = url.replace(/^https?:\/\//, '').replace(/\/$/, '')

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      {/* chrome */}
      <div className="flex items-center gap-3 border-b border-border bg-background/50 px-3 py-2">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-muted" />
          <span className="h-2 w-2 rounded-full bg-muted" />
          <span className="h-2 w-2 rounded-full bg-muted" />
        </div>

        <span className="min-w-0 flex-1 truncate rounded-sm border border-border bg-card px-2 py-1 font-mono text-[11px] text-muted-foreground">
          {host}
        </span>

        <div className="hidden items-center rounded-md border border-border p-0.5 sm:flex">
          <button
            type="button"
            onClick={() => setDevice('desktop')}
            aria-label="Desktop width"
            aria-pressed={device === 'desktop'}
            className={cn(
              'press flex h-6 w-6 items-center justify-center rounded-sm transition-colors duration-150',
              device === 'desktop' ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            <Monitor className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setDevice('mobile')}
            aria-label="Mobile width"
            aria-pressed={device === 'mobile'}
            className={cn(
              'press flex h-6 w-6 items-center justify-center rounded-sm transition-colors duration-150',
              device === 'mobile' ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>

        <a
          href={url}
          target="_blank"
          rel="noreferrer noopener"
          className="press label inline-flex items-center gap-1.5 rounded-md border border-border px-2 py-1.5 text-muted-foreground transition-colors duration-150 hover:bg-muted/60 hover:text-foreground"
        >
          Open
          <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </a>
      </div>

      {/* viewport */}
      <div ref={shellRef} className="relative aspect-[16/10] overflow-hidden bg-background">
        <img
          src={fallback || '/placeholder.svg'}
          alt={`${name} preview`}
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-300',
            showFrame && loaded ? 'opacity-0' : 'opacity-70',
          )}
        />

        {showFrame ? (
          <div className="absolute inset-0 flex justify-center overflow-hidden">
            <iframe
              src={url}
              title={`${name} live preview`}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
              referrerPolicy="no-referrer"
              onLoad={() => setLoaded(true)}
              style={{
                width: frameWidth,
                flexShrink: 0,
                height: shellWidth ? Math.round((shellWidth * 10) / 16 / scale) : '100%',
                transform: `scale(${scale})`,
                transformOrigin: 'top center',
                border: 0,
                opacity: loaded ? 1 : 0,
                transition: 'opacity 320ms var(--ease-out-strong)',
              }}
            />
          </div>
        ) : null}

        {!showFrame ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/55 backdrop-blur-[1px]">
            {embeddable && !failed ? (
              <>
                <button
                  type="button"
                  onClick={() => setLive(true)}
                  className="press rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors duration-150 hover:bg-primary/90"
                >
                  Load live preview
                </button>
                <p className="label text-muted-foreground">Runs {host} in a sandboxed frame</p>
              </>
            ) : (
              <>
                <p className="label text-brand">Embedding blocked by this site</p>
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="press inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium transition-colors duration-150 hover:bg-muted/60"
                >
                  Open {host}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </>
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}
