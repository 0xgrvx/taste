'use client'

import type { Entry } from '@/lib/registry'
import { usePreview } from '@/components/preview-layer'

/** Wraps any server-rendered block so hovering it opens the cursor preview panel. */
export function PreviewTrigger({
  entry,
  className,
  children,
}: {
  entry: Entry
  className?: string
  children: React.ReactNode
}) {
  const { show, hide } = usePreview()

  return (
    <div className={className} onPointerEnter={(e) => show(entry, e)} onPointerLeave={hide}>
      {children}
    </div>
  )
}
