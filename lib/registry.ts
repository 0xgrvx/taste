import { CATEGORIES as _CATEGORIES, ENTRIES as _ENTRIES } from '@/lib/registry-data'

export type CategoryId = 'ui' | 'animation' | 'webgl' | 'shaders' | 'tools'

export type Install = {
  type: 'npm' | 'shadcn'
  target: string
}

export type Maker = {
  name: string
  role?: string
  x?: string
  github?: string
  site?: string
}

export type Work = {
  title: string
  url: string
  note: string
}

export type Entry = {
  slug: string
  name: string
  tagline: string
  description: string
  url: string
  category: CategoryId
  tags: string[]
  embeddable: boolean
  install?: Install
  makers: Maker[]
  best: Work[]
  featured?: boolean
  featuredOrder?: number
}

// Re-export data from registry
export const CATEGORIES = _CATEGORIES as unknown as { id: CategoryId; label: string; blurb: string }[]
export const ENTRIES = _ENTRIES as unknown as Entry[]

export const FEATURED = ENTRIES.filter((e) => e.featured).sort(
  (a, b) =>
    (a.featuredOrder ?? Number.MAX_SAFE_INTEGER) - (b.featuredOrder ?? Number.MAX_SAFE_INTEGER) ||
    a.name.localeCompare(b.name),
)

export function getEntry(slug: string) {
  return ENTRIES.find((e) => e.slug === slug)
}

export function byCategory(id: CategoryId) {
  return ENTRIES.filter((e) => e.category === id)
}

export function categoryLabel(id: CategoryId) {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id
}

export function previewImage(entry: Entry) {
  return `/previews/${entry.category}.png`
}

export function faviconUrl(url: string, size = 64) {
  try {
    return `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=${size}`
  } catch {
    return null
  }
}

export function relatedEntries(entry: Entry, count = 3) {
  return ENTRIES.filter((e) => e.slug !== entry.slug && e.category === entry.category).slice(0, count)
}

export const MAKER_COUNT = new Set(ENTRIES.flatMap((e) => e.makers.map((m) => m.name))).size
