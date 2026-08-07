'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LayoutGrid, List, Search, X } from 'lucide-react'
import { CATEGORIES, ENTRIES, type CategoryId } from '@/lib/registry'
import { EntryCard, EntryRow } from '@/components/entry-card'
import { cn } from '@/lib/utils'

type View = 'grid' | 'list'

export function IndexExplorer({ initialCategory = 'all' }: { initialCategory?: CategoryId | 'all' }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<CategoryId | 'all'>(initialCategory)
  const [view, setView] = useState<View>('grid')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const router = useRouter()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  function selectCategory(id: CategoryId | 'all') {
    setCategory(id)
    const params = new URLSearchParams(window.location.search)
    if (id === 'all') params.delete('c')
    else params.set('c', id)
    const qs = params.toString()
    router.replace(`/browse${qs ? `?${qs}` : ''}`, { scroll: false })
  }

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return ENTRIES.filter((e) => {
      if (category !== 'all' && e.category !== category) return false
      if (!q) return true
      const haystack = [e.name, e.tagline, e.description, ...e.tags, ...e.makers.map((m) => m.name)]
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [query, category])

  return (
    <div>
      {/* controls */}
      <div className="sticky top-14 z-30 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="flex flex-col gap-3 py-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.nativeEvent.isComposing || e.keyCode === 229) return
                if (e.key === 'Escape') setQuery('')
              }}
              placeholder="Search libraries, makers, tags — press /"
              aria-label="Search the index"
              className="h-10 w-full rounded-md border border-border bg-card pl-9 pr-9 font-mono text-xs text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="press absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            ) : null}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
            <FilterChip active={category === 'all'} onClick={() => selectCategory('all')}>
              All
            </FilterChip>
            {CATEGORIES.map((c) => (
              <FilterChip key={c.id} active={category === c.id} onClick={() => selectCategory(c.id)}>
                {c.label}
              </FilterChip>
            ))}

            <div className="ml-1 hidden items-center rounded-md border border-border p-0.5 sm:flex">
              <button
                type="button"
                onClick={() => setView('grid')}
                aria-label="Grid view"
                aria-pressed={view === 'grid'}
                className={cn(
                  'press flex h-7 w-7 items-center justify-center rounded-sm transition-colors duration-150',
                  view === 'grid' ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <LayoutGrid className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setView('list')}
                aria-label="List view"
                aria-pressed={view === 'list'}
                className={cn(
                  'press flex h-7 w-7 items-center justify-center rounded-sm transition-colors duration-150',
                  view === 'list' ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <List className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <p className="label py-4 text-muted-foreground" aria-live="polite">
        {results.length} {results.length === 1 ? 'entry' : 'entries'}
        {category === 'all' ? '' : ` in ${CATEGORIES.find((c) => c.id === category)?.label}`}
      </p>

      {results.length === 0 ? (
        <div className="hatch flex min-h-64 flex-col items-center justify-center gap-2 border border-border">
          <p className="text-sm text-foreground">Nothing matches that yet.</p>
          <p className="label text-muted-foreground">Try a tag like shaders, scroll or registry</p>
        </div>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-1 border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((entry, i) => (
            <EntryCard key={entry.slug} entry={entry} index={i} />
          ))}
        </div>
      ) : (
        <div className="border-t border-border">
          {results.map((entry, i) => (
            <EntryRow key={entry.slug} entry={entry} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'press label shrink-0 rounded-md border px-2.5 py-2 transition-colors duration-150',
        active
          ? 'border-brand/45 bg-brand/10 text-brand'
          : 'border-border text-muted-foreground hover:bg-muted/50 hover:text-foreground',
      )}
    >
      {children}
    </button>
  )
}
