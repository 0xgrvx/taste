# taste

**A curated index of UI libraries, motion kits, shaders and WebGL tools, and the people who made them.**

Taste is a hand-picked catalog — hover any entry for a live preview, copy the install command, then go read their best work.

## Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + CSS custom properties in OKLCH
- **Components:** Base UI (accessible primitives), custom components
- **Icons:** Lucide React + custom inline SVGs
- **Fonts:** Geist (body), Geist Mono (labels) via `next/font/google`
- **Analytics:** Vercel Analytics
- **Animations:** CSS keyframes + Motion (formerly Framer Motion)

## Contents

| Route | Page |
|---|---|
| `/` | Home — hero, category strip, editor's picks, makers marquee, recent entries |
| `/browse` | Full searchable index with category filter, grid/list toggle |
| `/browse?c=ui` | Filtered by category |
| `/t/[slug]` | Detail page — live embed, install command, best work links, maker cards, related |
| `/about` | Curation rules |
| `/*` | Custom 404 |

## Registry data model

Entries live as individual JSON files in `registry/entries/*.json`. Categories are in `registry/categories.json`. A build script compiles them into a typed TypeScript module at build time.

```
registry/
├── categories.json              # 5 categories
└── entries/                     # 50 entry files
    ├── shadcn-ui.json
    ├── three-js.json
    └── ...
```

### Entry schema

```typescript
{
  slug: string           // URL-safe id
  name: string           // display name
  tagline: string        // short hook
  description: string    // longer description
  url: string            // official site
  category: CategoryId   // "ui" | "animation" | "webgl" | "shaders" | "tools"
  tags: string[]         // 2-4 descriptive tags
  embeddable: boolean    // can it be iframe-previewed?
  install?: { type: "npm" | "shadcn"; target: string }
  makers: { name: string; role?: string; x?: string; github?: string; site?: string }[]
  best: { title: string; url: string; note: string }[]
  featured?: boolean     // editor's pick
}
```

## Scripts

| Script | Description |
|---|---|
| `pnpm dev` | Start dev server (runs build:registry automatically) |
| `pnpm build` | Production build (runs build:registry automatically) |
| `pnpm build:registry` | Compile `registry/entries/*.json` → `lib/registry-data.ts` |
| `pnpm extract` | Reverse: extract inline data from `lib/registry.ts` back to JSON files |

## Key features

- **Cursor-tracking preview panel** — hover any entry card (1024px+) to see a live iframe or fallback image follow your pointer. 90ms open delay, instant subsequent opens.
- **Live embed on detail pages** — browser chrome UI (traffic dots, URL bar, device toggle) wrapping a scaled iframe. Click-to-load, 6s timeout fallback for blocked sites.
- **Package manager selector** — toggle between pnpm/npm/yarn/bun for install commands.
- **Makers marquee** — infinite scroll of all 50+ credited makers across the index.
- **Editor's picks** — manually featured entries with a large lead card layout.
- **Search + filter** — full-text search across names, descriptions, tags and makers. Category filter chips. Grid/list view toggle.

## Design

Dark-only theme. Near-black base (#111) with a warm honey-gold accent. The diagonal **hatch pattern** is the visual signature — used in the favicon, hero decorations, card hover states, placeholders, and empty states.

- `--brand`: `oklch(0.82 0.15 79)` — the gold accent
- `--primary`: `oklch(0.95 0 0)` — near-white inverted primary
- `--background`: `oklch(0.135 0 0)` — near-black base

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding an entry

1. Create `registry/entries/{slug}.json` following the schema above.
2. Run `pnpm build:registry` to regenerate `lib/registry-data.ts`.
3. The new entry appears on the homepage and browse page.

## Credits

Curated by [gauravmandall](https://x.com/intent/follow?screen_name=gauravmandall). Every project belongs to its makers.
