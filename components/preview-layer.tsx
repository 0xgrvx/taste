'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { categoryLabel, previewImage, type Entry } from '@/lib/registry'

type PreviewContextValue = {
  show: (entry: Entry) => void
  hide: () => void
}

const PreviewContext = createContext<PreviewContextValue>({ show: () => {}, hide: () => {} })

export function usePreview() {
  return useContext(PreviewContext)
}

const PANEL_W = 440
const PANEL_H = 288
const FRAME_W = 1320
const OPEN_DELAY = 90

export function PreviewProvider({ children }: { children: React.ReactNode }) {
  const [entry, setEntry] = useState<Entry | null>(null)
  const [mounted, setMounted] = useState(false)
  const [hoverCapable, setHoverCapable] = useState(false)

  const panelRef = useRef<HTMLDivElement | null>(null)
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isOpen = useRef(false)
  const point = useRef({ x: 0, y: 0 })

  useEffect(() => {
    setMounted(true)
    const mq = window.matchMedia('(hover: hover) and (min-width: 1024px)')
    setHoverCapable(mq.matches)
    const onChange = () => setHoverCapable(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const place = useCallback(() => {
    const el = panelRef.current
    if (!el) return
    const pad = 16
    const x = Math.min(Math.max(point.current.x + 24, pad), window.innerWidth - PANEL_W - pad)
    const y = Math.min(Math.max(point.current.y - PANEL_H / 2, pad), window.innerHeight - PANEL_H - pad)
    // set transform directly: avoids recalculating inherited custom properties
    el.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`
  }, [])

  useEffect(() => {
    if (!hoverCapable) return
    const onMove = (e: PointerEvent) => {
      point.current = { x: e.clientX, y: e.clientY }
      if (isOpen.current) place()
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [hoverCapable, place])

  const show = useCallback(
    (next: Entry) => {
      if (!hoverCapable) return
      if (openTimer.current) clearTimeout(openTimer.current)
      const commit = () => {
        isOpen.current = true
        setEntry(next)
        requestAnimationFrame(place)
      }
      // subsequent previews open instantly, like adjacent tooltips
      if (isOpen.current) commit()
      else openTimer.current = setTimeout(commit, OPEN_DELAY)
    },
    [hoverCapable, place],
  )

  const hide = useCallback(() => {
    if (openTimer.current) clearTimeout(openTimer.current)
    isOpen.current = false
    setEntry(null)
  }, [])

  return (
    <PreviewContext.Provider value={{ show, hide }}>
      {children}
      {mounted && hoverCapable
        ? createPortal(
            <div
              ref={panelRef}
              aria-hidden="true"
              className="pointer-events-none fixed left-0 top-0 z-50 will-change-transform"
              style={{ width: PANEL_W }}
            >
              <div
                data-open={entry ? 'true' : 'false'}
                className="origin-left overflow-hidden rounded-md border border-border bg-card shadow-2xl shadow-black/60 transition-[opacity,transform,filter] duration-[180ms] ease-[var(--ease-out-strong)] data-[open=false]:scale-[0.97] data-[open=false]:opacity-0 data-[open=false]:blur-[2px] data-[open=true]:scale-100 data-[open=true]:opacity-100"
              >
                <div className="flex items-center justify-between gap-2 border-b border-border bg-background/60 px-3 py-2">
                  <span className="label text-muted-foreground">
                    {entry ? categoryLabel(entry.category) : 'Preview'}
                  </span>
                  <span className="label truncate text-foreground/70">
                    {entry ? entry.url.replace(/^https?:\/\//, '') : ''}
                  </span>
                </div>

                <div className="relative bg-background" style={{ height: PANEL_H - 37 }}>
                  {entry ? (
                    <>
                      {/* fallback plate, always underneath */}
                      <img
                        src={previewImage(entry) || '/placeholder.svg'}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover opacity-70"
                      />
                      {entry.embeddable ? (
                        <LiveFrame key={entry.slug} url={entry.url} height={PANEL_H - 37} />
                      ) : (
                        <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-background via-background/85 to-transparent px-3 pb-2.5 pt-8">
                          <span className="label text-brand">Embedding blocked</span>
                          <span className="label text-muted-foreground">— open to view</span>
                        </div>
                      )}
                    </>
                  ) : null}
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </PreviewContext.Provider>
  )
}

function LiveFrame({ url, height }: { url: string; height: number }) {
  const [loaded, setLoaded] = useState(false)
  const scale = PANEL_W / FRAME_W

  return (
    <div className="absolute inset-0 overflow-hidden">
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
          height: Math.round(height / scale),
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          border: 0,
          opacity: loaded ? 1 : 0,
          transition: 'opacity 260ms var(--ease-out-strong)',
        }}
      />
    </div>
  )
}
