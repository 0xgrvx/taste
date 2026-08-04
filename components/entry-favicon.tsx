'use client'

import { useState } from 'react'
import { faviconUrl } from '@/lib/registry'
import { cn } from '@/lib/utils'

/** Small favicon tile for an entry, falling back to a quiet letter mark. */
export function EntryFavicon({
  url,
  name,
  size = 24,
  className,
}: {
  url: string
  name: string
  size?: number
  className?: string
}) {
  const [failed, setFailed] = useState(false)
  const src = faviconUrl(url)

  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex shrink-0 items-center justify-center overflow-hidden rounded-[5px] border border-border bg-card',
        className,
      )}
      style={{ width: size, height: size }}
    >
      {src && !failed ? (
        <img
          src={src}
          alt=""
          width={size}
          height={size}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-contain"
        />
      ) : (
        <span className="text-[10px] font-semibold leading-none text-foreground/50">{name.charAt(0)}</span>
      )}
    </span>
  )
}
