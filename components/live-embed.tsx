'use client'

import { useEffect, useRef, useState } from 'react'

const FRAME_W = 1320
const FRAME_ASPECT = 16 / 9

/** Renders a site inside a scaled iframe, sized to its container. */
export function LiveEmbed({ url, className }: { url: string; className?: string }) {
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

  const scale = width > 0 ? width / FRAME_W : 0

  return (
    <div ref={ref} className={`pointer-events-none overflow-hidden ${className ?? ''}`}>
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
            width: FRAME_W,
            height: Math.round(FRAME_W * FRAME_ASPECT),
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
