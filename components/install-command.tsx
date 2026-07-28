'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, ChevronsUpDown, Copy } from 'lucide-react'
import { installCommand, MANAGERS, type Manager } from '@/lib/install'
import type { Install } from '@/lib/registry'
import { cn } from '@/lib/utils'

export function InstallCommand({
  install,
  className,
}: {
  install: Install
  className?: string
}) {
  const [pm, setPm] = useState<Manager>('pnpm')
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const command = installCommand(install, pm)

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 1600)
    return () => clearTimeout(t)
  }, [copied])

  async function copy() {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div ref={wrapRef} className={cn('relative', className)}>
      <div className="flex items-stretch overflow-hidden rounded-md border border-border bg-card">
        {/* package manager switch */}
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="press flex shrink-0 items-center gap-1.5 border-r border-border bg-background/40 px-3 py-2.5 font-mono text-xs text-foreground transition-colors duration-150 hover:bg-muted/60 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring"
        >
          {pm}
          <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
        </button>

        <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap px-3 py-2.5 font-mono text-xs leading-5 text-muted-foreground">
          {command}
        </code>

        <button
          type="button"
          onClick={copy}
          aria-label={copied ? 'Copied' : 'Copy install command'}
          className="press flex shrink-0 items-center border-l border-border px-3 text-muted-foreground transition-colors duration-150 hover:bg-muted/60 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
          ) : (
            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* menu opens from the trigger, above it */}
      <div
        role="listbox"
        aria-label="Package manager"
        data-open={open}
        className={cn(
          'absolute bottom-[calc(100%+6px)] left-0 z-20 w-32 origin-bottom-left rounded-md border border-border bg-popover p-1 shadow-xl shadow-black/50',
          'transition-[opacity,transform] duration-[160ms] ease-[var(--ease-out-strong)]',
          open ? 'scale-100 opacity-100' : 'pointer-events-none scale-[0.96] opacity-0',
        )}
      >
        {MANAGERS.map((m) => (
          <button
            key={m}
            type="button"
            role="option"
            aria-selected={m === pm}
            onClick={() => {
              setPm(m)
              setOpen(false)
            }}
            className={cn(
              'flex w-full items-center justify-between rounded-sm px-2.5 py-2 font-mono text-xs transition-colors duration-150',
              m === pm ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
              'hover:bg-muted/70',
            )}
          >
            {m}
            {m === pm ? <Check className="h-3 w-3 text-brand" aria-hidden="true" /> : null}
          </button>
        ))}
      </div>
    </div>
  )
}
