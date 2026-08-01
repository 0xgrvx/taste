'use client'

import { useEffect, useRef, useState } from 'react'

const FRAME_W = 1320
const INTERACTIVE_H = 560

/**
 * Renders a site inside an iframe.
 *
 * `interactive` (detail pages): natural width, bounded height, internally
 * scrollable and clickable so visitors can navigate the embedded site.
 *
 * Default (teaser cards): the full page scaled to fit a 16:9 box, inert to
 * pointer events so it behaves like a still frame.
 */
export function LiveEmbed({
  url,
  name,
  embeddable,
  fallback,
  interactive = false,
  className,
}: {
  url: string
  name?: string
  embeddable?: boolean
  fallback?: string | null
  interactive?: boolean
  className?: string
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [width, setWidth] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(() => setWidth(el.clientWidth))
    ro.observe(el)
    setWidth(el.clientWidth)
    return () => ro.disconnect()
  }, [])

  if (embeddable === false) {
    return (
      <div
        className={`relative overflow-hidden rounded-md border border-border bg-background ${className ?? ''}`}
        style={{ aspectRatio: '16 / 9' }}
      >
        <img
          src={fallback || '/placeholder.svg'}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-background via-background/85 to-transparent px-3 pb-2.5 pt-8">
          <span className="label text-brand">Embedding blocked</span>
          <span className="label text-muted-foreground">— open to view</span>
        </div>
      </div>
    )
  }

  if (interactive) {
    return (
      <div
        ref={ref}
        className={`relative overflow-hidden rounded-md border border-border bg-background ${className ?? ''}`}
        style={{ height: INTERACTIVE_H }}
      >
        <iframe
          src={url}
          title={name ? `${name} live site` : ''}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            border: 0,
            opacity: loaded ? 1 : 0,
            transition: 'opacity 260ms var(--ease-out-strong)',
          }}
        />
      </div>
    )
  }

  const scale = width > 0 ? width / FRAME_W : 0

  return (
    <div
      ref={ref}
      className={`pointer-events-none relative overflow-hidden ${className ?? ''}`}
      style={width ? { height: Math.round((width * 9) / 16) } : undefined}
    >
      {width > 0 ? (
        <iframe
          src={url}
          title=""
          tabIndex={-1}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-popups-to-escape-sandbox"
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: FRAME_W,
            height: Math.round((FRAME_W * 9) / 16),
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            border: 0,
            opacity: loaded ? 1 : 0,
            transition: 'opacity 260ms var(--ease-out-strong)',
          }}
        />
      ) : null}
    </div>
  )
}
