export type CategoryId = 'ui' | 'animation' | 'webgl' | 'shaders' | 'tools'

export type Install = {
  /** npm package, or a shadcn registry item */
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
  /** false when the site sends X-Frame-Options / frame-ancestors and cannot be iframed */
  embeddable: boolean
  install?: Install
  makers: Maker[]
  best: Work[]
  featured?: boolean
}

export const CATEGORIES: { id: CategoryId; label: string; blurb: string }[] = [
  { id: 'ui', label: 'UI libraries', blurb: 'Component systems and registries worth stealing from.' },
  { id: 'animation', label: 'Animation', blurb: 'Motion engines, primitives and gesture work.' },
  { id: 'webgl', label: '3D / WebGL', blurb: 'Renderers, scene graphs and the React layer on top.' },
  { id: 'shaders', label: 'Shaders', blurb: 'GLSL playgrounds, gradient engines and shader kits.' },
  { id: 'tools', label: 'Tools', blurb: 'Color, type, icons and the small utilities that compound.' },
]

export const ENTRIES: Entry[] = [
  /* ------------------------------- UI ------------------------------- */
  {
    slug: 'shadcn-ui',
    name: 'shadcn/ui',
    tagline: 'Components you own, not components you install',
    description:
      'A registry of accessible, copy-in React components built on Radix and Tailwind. It changed how the ecosystem thinks about component distribution: the code lands in your repo, so it stays yours.',
    url: 'https://ui.shadcn.com',
    category: 'ui',
    tags: ['react', 'tailwind', 'registry', 'radix'],
    embeddable: true,
    install: { type: 'shadcn', target: 'button' },
    makers: [{ name: 'shadcn', role: 'Creator', x: 'shadcn', github: 'shadcn', site: 'https://shadcn.com' }],
    best: [
      { title: 'shadcn/ui', url: 'https://ui.shadcn.com', note: 'The registry that reset component distribution.' },
      { title: 'Taxonomy', url: 'https://tx.shadcn.com', note: 'The App Router reference app everyone copied in 2023.' },
    ],
    featured: true,
  },
  {
    slug: 'base-ui',
    name: 'Base UI',
    tagline: 'Unstyled primitives from the Radix and MUI minds',
    description:
      'Headless, accessible React primitives with a tiny API surface and excellent animation hooks. Built by the people behind Radix UI, MUI Base and Floating UI.',
    url: 'https://base-ui.com',
    category: 'ui',
    tags: ['react', 'headless', 'a11y', 'primitives'],
    embeddable: false,
    install: { type: 'npm', target: '@base-ui-components/react' },
    makers: [
      { name: 'Colm Tuite', role: 'Co-creator', x: 'colmtuite', github: 'colmtuite' },
      { name: 'Vlad Moroz', role: 'Co-creator', x: 'vladmoroz', github: 'vladmoroz' },
    ],
    best: [
      { title: 'Base UI', url: 'https://base-ui.com', note: 'Primitives with first-class transition states.' },
      { title: 'Floating UI', url: 'https://floating-ui.com', note: 'The positioning engine under half the web.' },
    ],
    featured: true,
  },
  {
    slug: 'radix-ui',
    name: 'Radix UI',
    tagline: 'The accessibility layer of the modern React stack',
    description:
      'Low-level UI primitives with a relentless focus on keyboard behavior, focus management and WAI-ARIA correctness. If a dropdown feels right anywhere, it is probably Radix underneath.',
    url: 'https://www.radix-ui.com',
    category: 'ui',
    tags: ['react', 'headless', 'a11y'],
    embeddable: true,
    install: { type: 'npm', target: 'radix-ui' },
    makers: [
      { name: 'Colm Tuite', role: 'Co-founder', x: 'colmtuite', github: 'colmtuite' },
      { name: 'Pedro Duarte', role: 'Co-founder', x: 'peduarte', github: 'peduarte' },
    ],
    best: [
      { title: 'Radix Primitives', url: 'https://www.radix-ui.com/primitives', note: 'The behavior spec, in code.' },
      { title: 'Radix Colors', url: 'https://www.radix-ui.com/colors', note: 'Twelve-step scales designed for real UI states.' },
    ],
    featured: true,
  },
  {
    slug: 'vaul',
    name: 'Vaul',
    tagline: 'An iOS-grade drawer for the web',
    description:
      'A drawer component with real momentum, damping at the boundaries and interruptible gestures. The reference implementation for how a sheet should feel under a thumb.',
    url: 'https://vaul.emilkowal.ski',
    category: 'ui',
    tags: ['react', 'drawer', 'gesture', 'motion'],
    embeddable: true,
    install: { type: 'npm', target: 'vaul' },
    makers: [
      { name: 'Emil Kowalski', role: 'Creator', x: 'emilkowalski_', github: 'emilkowalski', site: 'https://emilkowal.ski' },
    ],
    best: [
      { title: 'Sonner', url: 'https://sonner.emilkowal.ski', note: 'Toasts with spatial consistency and velocity-based dismissal.' },
      { title: 'animations.dev', url: 'https://animations.dev', note: 'The course that taught a generation about easing.' },
    ],
    featured: true,
  },
  {
    slug: 'sonner',
    name: 'Sonner',
    tagline: 'The toast that everyone benchmarks against',
    description:
      'Stacked, swipeable toasts that enter and exit from the same direction, dismiss on a flick rather than a threshold, and never fight the user. A masterclass in small-surface motion.',
    url: 'https://sonner.emilkowal.ski',
    category: 'ui',
    tags: ['react', 'toast', 'motion'],
    embeddable: true,
    install: { type: 'npm', target: 'sonner' },
    makers: [
      { name: 'Emil Kowalski', role: 'Creator', x: 'emilkowalski_', github: 'emilkowalski', site: 'https://emilkowal.ski' },
    ],
    best: [
      { title: 'Vaul', url: 'https://vaul.emilkowal.ski', note: 'Drawer physics done properly.' },
      { title: 'Emil’s writing', url: 'https://emilkowal.ski/ui', note: 'Essays on the details users never notice.' },
    ],
  },
  {
    slug: 'magic-ui',
    name: 'Magic UI',
    tagline: 'Marketing-grade effects, drop-in',
    description:
      'A large library of animated components for landing pages: marquees, beams, orbiting circles, text effects. Ships as a shadcn-compatible registry so nothing is a black box.',
    url: 'https://magicui.design',
    category: 'ui',
    tags: ['react', 'tailwind', 'marketing', 'effects'],
    embeddable: true,
    install: { type: 'shadcn', target: 'https://magicui.design/r/marquee.json' },
    makers: [{ name: 'Dillion Verma', role: 'Co-founder', x: 'dillionverma', github: 'dillionverma' }],
    best: [
      { title: 'Magic UI', url: 'https://magicui.design', note: '150+ animated components in one registry.' },
      { title: 'Portfolio template', url: 'https://github.com/dillionverma/portfolio', note: 'The most-forked dev portfolio of its year.' },
    ],
    featured: true,
  },
  {
    slug: 'aceternity-ui',
    name: 'Aceternity UI',
    tagline: 'Big, loud, screenshot-ready components',
    description:
      'Bold Tailwind and Motion components — spotlight cards, 3D pins, wobble grids — built for hero sections that stop the scroll.',
    url: 'https://ui.aceternity.com',
    category: 'ui',
    tags: ['react', 'tailwind', 'motion', 'marketing'],
    embeddable: true,
    makers: [{ name: 'Manu Arora', role: 'Creator', x: 'mannupaaji', github: 'manuarora700' }],
    best: [
      { title: 'Aceternity UI', url: 'https://ui.aceternity.com', note: 'The component set behind a thousand launch pages.' },
      { title: 'Aceternity templates', url: 'https://pro.aceternity.com', note: 'Full page systems with the same energy.' },
    ],
  },
  {
    slug: 'motion-primitives',
    name: 'Motion Primitives',
    tagline: 'Restrained motion components for React',
    description:
      'A tasteful set of animated primitives — text effects, morphing dialogs, cursors, transitions — with source you can read in one sitting.',
    url: 'https://motion-primitives.com',
    category: 'ui',
    tags: ['react', 'motion', 'tailwind'],
    embeddable: true,
    makers: [{ name: 'Julien Thibeaut', role: 'Creator', x: 'ibelick', github: 'ibelick', site: 'https://ibelick.com' }],
    best: [
      { title: 'Motion Primitives', url: 'https://motion-primitives.com', note: 'Motion components with actual taste.' },
      { title: 'bg.ibelick', url: 'https://bg.ibelick.com', note: 'A gallery of pure-CSS background patterns.' },
    ],
  },
  {
    slug: 'react-bits',
    name: 'React Bits',
    tagline: 'Animated, glassy, occasionally unhinged',
    description:
      'A big collection of animated React components and text effects with CSS and Tailwind variants for each one — a fast way to add character to a page.',
    url: 'https://reactbits.dev',
    category: 'ui',
    tags: ['react', 'effects', 'text'],
    embeddable: true,
    makers: [{ name: 'David Haz', role: 'Creator', x: 'davidhaz', github: 'DavidHDev' }],
    best: [
      { title: 'React Bits', url: 'https://reactbits.dev', note: 'Effect-first components, every variant included.' },
      { title: 'Aura', url: 'https://github.com/DavidHDev/react-bits', note: 'The open repo behind the site.' },
    ],
  },
  {
    slug: 'kibo-ui',
    name: 'Kibo UI',
    tagline: 'The composite components shadcn/ui leaves out',
    description:
      'Kanban boards, gantt charts, editors, AI chat surfaces — larger composed blocks that still install through the shadcn CLI and stay editable.',
    url: 'https://www.kibo-ui.com',
    category: 'ui',
    tags: ['react', 'registry', 'blocks', 'ai'],
    embeddable: true,
    install: { type: 'shadcn', target: '@kibo-ui/kanban' },
    makers: [{ name: 'Hayden Bleasel', role: 'Creator', x: 'haydenbleasel', github: 'haydenbleasel', site: 'https://haydenbleasel.com' }],
    best: [
      { title: 'Kibo UI', url: 'https://www.kibo-ui.com', note: 'Composite blocks, shadcn-native.' },
      { title: 'next-forge', url: 'https://www.next-forge.com', note: 'An opinionated production Next.js monorepo template.' },
    ],
  },
  {
    slug: 'bklit-ui',
    name: 'Bklit UI',
    tagline: 'Design-engineered data visualization',
    description:
      'Charts built like product surfaces rather than chart-library output: precise typography, restrained color, live line rendering and a studio for composing them.',
    url: 'https://bklit.com',
    category: 'ui',
    tags: ['react', 'charts', 'dataviz'],
    embeddable: true,
    makers: [{ name: 'Matt', role: 'Creator', x: 'uixmat', github: 'uixmat' }],
    best: [
      { title: 'Bklit UI', url: 'https://bklit.com', note: 'Charts with the detail level of a trading terminal.' },
      { title: 'Bklit Studio', url: 'https://bklit.com/studio', note: 'Compose a chart, export the code.' },
    ],
    featured: true,
  },
  {
    slug: 'skiper-ui',
    name: 'Skiper UI',
    tagline: 'Scroll and carousel experiments, productised',
    description:
      'Card stacks, scroll-linked sliders and marquee experiments packaged as installable registry items — the kind of interaction usually locked inside an agency site.',
    url: 'https://skiper-ui.com',
    category: 'ui',
    tags: ['react', 'scroll', 'carousel', 'registry'],
    embeddable: true,
    install: { type: 'shadcn', target: '@skiper-ui/skiper104' },
    makers: [{ name: 'Skiper UI', role: 'Studio', x: 'skiper_ui', site: 'https://skiper-ui.com' }],
    best: [
      { title: 'Skiper UI', url: 'https://skiper-ui.com', note: 'Scroll interactions you can install.' },
      { title: 'Component index', url: 'https://skiper-ui.com/docs', note: 'Every experiment, numbered and documented.' },
    ],
  },
  {
    slug: 'fancy-components',
    name: 'Fancy Components',
    tagline: 'Playful, physics-flavored React bits',
    description:
      'Text and layout components with a strong point of view — gravity, elastic lines, variable-font morphs. Great source material for learning motion technique.',
    url: 'https://fancycomponents.dev',
    category: 'ui',
    tags: ['react', 'motion', 'text', 'physics'],
    embeddable: true,
    makers: [{ name: 'Daniel Petho', role: 'Creator', x: 'danielpetho', github: 'danielpetho' }],
    best: [
      { title: 'Fancy Components', url: 'https://fancycomponents.dev', note: 'Motion experiments, documented properly.' },
      { title: 'Variable font effects', url: 'https://fancycomponents.dev/docs/components/text/variable-font-hover-by-letter', note: 'Per-letter variable font hover.' },
    ],
  },
  {
    slug: '21st-dev',
    name: '21st.dev',
    tagline: 'An npm for design engineers',
    description:
      'A community registry of React and Tailwind components with previews, install commands and an AI agent that drops them into your codebase.',
    url: 'https://21st.dev',
    category: 'ui',
    tags: ['registry', 'react', 'community'],
    embeddable: true,
    makers: [{ name: 'Serafim Cloud', role: 'Founder', x: 'serafimcloud', github: 'serafimcloud' }],
    best: [
      { title: '21st.dev', url: 'https://21st.dev', note: 'Community components with real previews.' },
      { title: 'Magic MCP', url: 'https://21st.dev/magic', note: 'An MCP that writes UI into your editor.' },
    ],
  },
  {
    slug: 'origin-ui',
    name: 'Origin UI',
    tagline: 'Hundreds of small, correct variations',
    description:
      'An enormous catalogue of input, select, dialog and table variants built on shadcn/ui conventions — the fastest way to find the exact field you were about to build.',
    url: 'https://originui.com',
    category: 'ui',
    tags: ['react', 'tailwind', 'forms'],
    embeddable: true,
    makers: [{ name: 'Origin UI', role: 'Team', site: 'https://originui.com', github: 'origin-space' }],
    best: [
      { title: 'Origin UI', url: 'https://originui.com', note: 'Every input variant you will ever need.' },
      { title: 'Origin UI inputs', url: 'https://originui.com/inputs', note: 'A reference sheet for form craft.' },
    ],
  },
  {
    slug: 'heroui',
    name: 'HeroUI',
    tagline: 'Beautiful defaults on top of React Aria',
    description:
      'A full component library (formerly NextUI) with strong theming, Tailwind Variants styling and Adobe React Aria behavior underneath.',
    url: 'https://www.heroui.com',
    category: 'ui',
    tags: ['react', 'library', 'theming', 'a11y'],
    embeddable: true,
    install: { type: 'npm', target: '@heroui/react' },
    makers: [{ name: 'Junior Garcia', role: 'Founder', x: 'jrgarciadev', github: 'jrgarciadev' }],
    best: [
      { title: 'HeroUI', url: 'https://www.heroui.com', note: 'Opinionated defaults that still theme cleanly.' },
      { title: 'Tailwind Variants', url: 'https://tailwind-variants.org', note: 'Variant API that made styling systems sane.' },
    ],
  },
  {
    slug: 'mantine',
    name: 'Mantine',
    tagline: '100+ components and hooks, batteries included',
    description:
      'A mature React library with dark mode, forms, dates, charts, notifications and a hooks package that is worth installing on its own.',
    url: 'https://mantine.dev',
    category: 'ui',
    tags: ['react', 'library', 'hooks'],
    embeddable: true,
    install: { type: 'npm', target: '@mantine/core' },
    makers: [{ name: 'Vitaly Rtishchev', role: 'Creator', x: 'rtivital', github: 'rtivital' }],
    best: [
      { title: 'Mantine', url: 'https://mantine.dev', note: 'One of the most complete React libraries shipped.' },
      { title: 'Mantine hooks', url: 'https://mantine.dev/hooks/use-hotkeys', note: '50+ hooks, usable outside Mantine.' },
    ],
  },
  {
    slug: 'chakra-ui',
    name: 'Chakra UI',
    tagline: 'The accessible system that trained a generation',
    description:
      'A style-props component system with tokens, recipes and a serious accessibility record — and the origin point for Ark UI and Zag.js.',
    url: 'https://chakra-ui.com',
    category: 'ui',
    tags: ['react', 'library', 'tokens', 'a11y'],
    embeddable: true,
    install: { type: 'npm', target: '@chakra-ui/react' },
    makers: [{ name: 'Segun Adebayo', role: 'Creator', x: 'thesegunadebayo', github: 'segunadebayo' }],
    best: [
      { title: 'Chakra UI', url: 'https://chakra-ui.com', note: 'Style props, tokens and recipes at scale.' },
      { title: 'Zag.js', url: 'https://zagjs.com', note: 'Component behavior as framework-agnostic state machines.' },
    ],
  },
  {
    slug: 'park-ui',
    name: 'Park UI',
    tagline: 'Ark UI plus a real design system',
    description:
      'Components built on Ark UI state machines and Panda CSS, available for React, Vue and Solid — headless behavior with a coherent visual language on top.',
    url: 'https://park-ui.com',
    category: 'ui',
    tags: ['react', 'vue', 'solid', 'panda'],
    embeddable: true,
    makers: [{ name: 'Christian Schröter', role: 'Creator', x: 'grizzly_codes', github: 'cschroeter' }],
    best: [
      { title: 'Park UI', url: 'https://park-ui.com', note: 'One system, three frameworks.' },
      { title: 'Ark UI', url: 'https://ark-ui.com', note: 'The state machines underneath.' },
    ],
  },
  {
    slug: 'tremor',
    name: 'Tremor',
    tagline: 'Dashboard blocks that look designed',
    description:
      'Charts, KPI cards and table blocks for React dashboards — copy-in components with sensible data-visualization defaults.',
    url: 'https://tremor.so',
    category: 'ui',
    tags: ['react', 'charts', 'dashboard'],
    embeddable: true,
    makers: [
      { name: 'Severin Landolt', role: 'Co-founder', x: 'sevlandolt', github: 'severinlandolt' },
      { name: 'Christopher Kindl', role: 'Co-founder', github: 'chrisk-7777' },
    ],
    best: [
      { title: 'Tremor', url: 'https://tremor.so', note: 'Dashboard primitives with restraint.' },
      { title: 'Tremor Blocks', url: 'https://blocks.tremor.so', note: 'Full dashboard sections, ready to paste.' },
    ],
  },

  /* ---------------------------- ANIMATION ---------------------------- */
  {
    slug: 'motion',
    name: 'Motion',
    tagline: 'The animation engine of the React era',
    description:
      'Formerly Framer Motion. Declarative animation, layout projection, springs, scroll linking and a hybrid engine that hands work to the browser where it can.',
    url: 'https://motion.dev',
    category: 'animation',
    tags: ['react', 'js', 'spring', 'layout'],
    embeddable: true,
    install: { type: 'npm', target: 'motion' },
    makers: [{ name: 'Matt Perry', role: 'Creator', x: 'mattgperry', github: 'mattgperry' }],
    best: [
      { title: 'Motion', url: 'https://motion.dev', note: 'Springs, layout animation and scroll, in one API.' },
      { title: 'Motion examples', url: 'https://examples.motion.dev', note: 'A reference library of real transitions.' },
    ],
    featured: true,
  },
  {
    slug: 'gsap',
    name: 'GSAP',
    tagline: 'Twenty years of timeline precision',
    description:
      'The timeline-based animation platform behind most award-winning sites, now fully free including SplitText, MorphSVG and ScrollTrigger.',
    url: 'https://gsap.com',
    category: 'animation',
    tags: ['js', 'timeline', 'scroll', 'svg'],
    embeddable: false,
    install: { type: 'npm', target: 'gsap' },
    makers: [{ name: 'Jack Doyle', role: 'Creator', x: 'greensock', github: 'jackdoyle' }],
    best: [
      { title: 'ScrollTrigger', url: 'https://gsap.com/docs/v3/Plugins/ScrollTrigger/', note: 'The plugin that defined scroll storytelling.' },
      { title: 'SplitText', url: 'https://gsap.com/docs/v3/Plugins/SplitText/', note: 'Per-character type animation without the hacks.' },
    ],
    featured: true,
  },
  {
    slug: 'anime-js',
    name: 'Anime.js',
    tagline: 'A tiny engine with a beautiful API',
    description:
      'Version 4 is a modular, ESM-first rewrite: timelines, springs, draggables, scroll observers and WAAPI output in a package you can read.',
    url: 'https://animejs.com',
    category: 'animation',
    tags: ['js', 'timeline', 'svg'],
    embeddable: true,
    install: { type: 'npm', target: 'animejs' },
    makers: [{ name: 'Julian Garnier', role: 'Creator', x: 'juliangarnier', github: 'juliangarnier' }],
    best: [
      { title: 'Anime.js v4', url: 'https://animejs.com', note: 'A rewrite that kept the elegance and added power.' },
      { title: 'Anime.js docs', url: 'https://animejs.com/documentation/', note: 'Docs that are themselves a demo.' },
    ],
  },
  {
    slug: 'theatre-js',
    name: 'Theatre.js',
    tagline: 'A motion design editor for code',
    description:
      'Animate anything in JavaScript — DOM, Three.js, canvas — on a real timeline with a visual editor, then ship the state as JSON.',
    url: 'https://www.theatrejs.com',
    category: 'animation',
    tags: ['js', 'timeline', 'three', 'editor'],
    embeddable: true,
    install: { type: 'npm', target: '@theatre/core' },
    makers: [{ name: 'Aria Minaei', role: 'Creator', x: 'ariaminaei', github: 'AriaMinaei' }],
    best: [
      { title: 'Theatre.js', url: 'https://www.theatrejs.com', note: 'A sequencer for the web, in the browser.' },
      { title: 'r3f-theatre', url: 'https://www.theatrejs.com/docs/latest/manual/r3f', note: 'Choreographing 3D scenes visually.' },
    ],
  },
  {
    slug: 'lenis',
    name: 'Lenis',
    tagline: 'Smooth scroll that does not fight the browser',
    description:
      'The smooth-scroll library from Darkroom Engineering: accessible, lightweight, and the default choice for scroll-driven sites that still feel native.',
    url: 'https://lenis.darkroom.engineering',
    category: 'animation',
    tags: ['scroll', 'js'],
    embeddable: false,
    install: { type: 'npm', target: 'lenis' },
    makers: [
      { name: 'Clement Roche', role: 'Co-founder, Darkroom', x: 'clementroche_', github: 'clementroche' },
      { name: 'Darkroom Engineering', role: 'Studio', x: 'darkroomengi', site: 'https://darkroom.engineering' },
    ],
    best: [
      { title: 'Lenis', url: 'https://lenis.darkroom.engineering', note: 'The smooth-scroll standard.' },
      { title: 'Darkroom work', url: 'https://darkroom.engineering', note: 'The studio behind a decade of award sites.' },
    ],
  },
  {
    slug: 'rive',
    name: 'Rive',
    tagline: 'Interactive vector animation with a state machine',
    description:
      'Design animations with real state machines and run them anywhere at tiny file sizes. The best answer to "we need a Lottie, but interactive".',
    url: 'https://rive.app',
    category: 'animation',
    tags: ['vector', 'runtime', 'state-machine'],
    embeddable: false,
    install: { type: 'npm', target: '@rive-app/react-canvas' },
    makers: [{ name: 'Guido Rosso', role: 'Co-founder & CEO', x: 'guidorosso', site: 'https://rive.app' }],
    best: [
      { title: 'Rive', url: 'https://rive.app', note: 'Editor and runtimes for interactive motion.' },
      { title: 'Rive state machines', url: 'https://rive.app/docs/editor/state-machine/state-machine', note: 'Animation logic without code.' },
    ],
  },
  {
    slug: 'auto-animate',
    name: 'AutoAnimate',
    tagline: 'One line, and your lists animate',
    description:
      'A zero-config drop-in that animates children as they are added, removed or moved. The highest ratio of polish to effort in front-end.',
    url: 'https://auto-animate.formkit.com',
    category: 'animation',
    tags: ['js', 'react', 'vue', 'lists'],
    embeddable: true,
    install: { type: 'npm', target: '@formkit/auto-animate' },
    makers: [{ name: 'Justin Schroeder', role: 'Creator, FormKit', x: 'jpschroeder', github: 'justin-schroeder' }],
    best: [
      { title: 'AutoAnimate', url: 'https://auto-animate.formkit.com', note: 'Free polish for every list in your app.' },
      { title: 'FormKit', url: 'https://formkit.com', note: 'Form framework with the same taste for defaults.' },
    ],
  },
  {
    slug: 'embla-carousel',
    name: 'Embla Carousel',
    tagline: 'A carousel with correct physics',
    description:
      'Dependency-free, extensible carousel with precise drag physics and snap behavior. The reason most shadcn carousels feel good.',
    url: 'https://www.embla-carousel.com',
    category: 'animation',
    tags: ['carousel', 'gesture', 'js'],
    embeddable: true,
    install: { type: 'npm', target: 'embla-carousel-react' },
    makers: [{ name: 'David Jerleke', role: 'Creator', x: 'davidjerleke', github: 'davidjerleke' }],
    best: [
      { title: 'Embla Carousel', url: 'https://www.embla-carousel.com', note: 'Drag physics that feel native.' },
      { title: 'Embla plugins', url: 'https://www.embla-carousel.com/plugins/', note: 'Autoplay, wheel and fade, composable.' },
    ],
  },
  {
    slug: 'number-flow',
    name: 'NumberFlow',
    tagline: 'Transitions for numbers, done properly',
    description:
      'An animated number component that handles localization, digit width and mid-flight interruption — the detail that makes dashboards feel alive.',
    url: 'https://number-flow.barvian.me',
    category: 'animation',
    tags: ['react', 'numbers', 'dataviz'],
    embeddable: true,
    install: { type: 'npm', target: '@number-flow/react' },
    makers: [{ name: 'Maxwell Barvian', role: 'Creator', x: 'maxbarvian', github: 'barvian', site: 'https://barvian.me' }],
    best: [
      { title: 'NumberFlow', url: 'https://number-flow.barvian.me', note: 'The number transition everyone copies.' },
      { title: 'motion-plus experiments', url: 'https://barvian.me', note: 'Small, sharp interaction studies.' },
    ],
  },
  {
    slug: 'animations-dev',
    name: 'animations.dev',
    tagline: 'The course behind a lot of good taste',
    description:
      'A structured course on web animation and design engineering — easing, springs, performance and the judgement of when not to animate.',
    url: 'https://animations.dev',
    category: 'animation',
    tags: ['course', 'education', 'craft'],
    embeddable: true,
    makers: [
      { name: 'Emil Kowalski', role: 'Creator', x: 'emilkowalski_', github: 'emilkowalski', site: 'https://emilkowal.ski' },
    ],
    best: [
      { title: 'animations.dev', url: 'https://animations.dev', note: 'Taste, taught as a curriculum.' },
      { title: 'Sonner', url: 'https://sonner.emilkowal.ski', note: 'The course applied to a real component.' },
    ],
  },

  /* ------------------------------ WEBGL ------------------------------ */
  {
    slug: 'three-js',
    name: 'Three.js',
    tagline: 'The library that made WebGL approachable',
    description:
      'The renderer, scene graph and material system that almost every 3D site on the web is built on, maintained in public for well over a decade.',
    url: 'https://threejs.org',
    category: 'webgl',
    tags: ['webgl', '3d', 'js'],
    embeddable: true,
    install: { type: 'npm', target: 'three' },
    makers: [{ name: 'Ricardo Cabello (mrdoob)', role: 'Creator', x: 'mrdoob', github: 'mrdoob', site: 'https://mrdoob.com' }],
    best: [
      { title: 'Three.js', url: 'https://threejs.org', note: 'The foundation of 3D on the web.' },
      { title: 'Three.js examples', url: 'https://threejs.org/examples/', note: 'Hundreds of reference scenes.' },
    ],
    featured: true,
  },
  {
    slug: 'react-three-fiber',
    name: 'React Three Fiber',
    tagline: 'Three.js as a component tree',
    description:
      'A React renderer for Three.js with no performance penalty, plus the Poimandres ecosystem — drei, postprocessing, rapier — around it.',
    url: 'https://r3f.docs.pmnd.rs',
    category: 'webgl',
    tags: ['react', 'three', '3d'],
    embeddable: true,
    install: { type: 'npm', target: '@react-three/fiber' },
    makers: [
      { name: 'Paul Henschel', role: 'Creator', x: '0xca0a', github: 'drcmda' },
      { name: 'Poimandres', role: 'Collective', x: 'pmndrs', site: 'https://pmnd.rs' },
    ],
    best: [
      { title: 'drei', url: 'https://drei.docs.pmnd.rs', note: 'The helper library that makes R3F practical.' },
      { title: 'Zustand', url: 'https://zustand.docs.pmnd.rs', note: 'State management with the same minimal instinct.' },
    ],
    featured: true,
  },
  {
    slug: 'spline',
    name: 'Spline',
    tagline: '3D design in the browser, exportable to the web',
    description:
      'A collaborative 3D editor with materials, physics and interaction events, plus React and viewer runtimes for shipping scenes to production.',
    url: 'https://spline.design',
    category: 'webgl',
    tags: ['3d', 'editor', 'no-code'],
    embeddable: false,
    install: { type: 'npm', target: '@splinetool/react-spline' },
    makers: [{ name: 'Spline', role: 'Team', x: 'splinetool', site: 'https://spline.design' }],
    best: [
      { title: 'Spline', url: 'https://spline.design', note: '3D authoring without a DCC pipeline.' },
      { title: 'Spline viewer', url: 'https://spline.design/embed', note: 'Interactive scenes in a single tag.' },
    ],
  },
  {
    slug: 'pixi-js',
    name: 'PixiJS',
    tagline: 'The fastest 2D renderer on the web',
    description:
      'A WebGL and WebGPU 2D engine used for games, data art and filter-heavy interactive work, with a filter and shader pipeline that is a joy to abuse.',
    url: 'https://pixijs.com',
    category: 'webgl',
    tags: ['2d', 'webgl', 'webgpu', 'games'],
    embeddable: true,
    install: { type: 'npm', target: 'pixi.js' },
    makers: [{ name: 'Mat Groves', role: 'Creator', x: 'doormat23', github: 'GoodBoyDigital' }],
    best: [
      { title: 'PixiJS', url: 'https://pixijs.com', note: 'Sprite and filter performance nothing else touches.' },
      { title: 'Pixi filters', url: 'https://pixijs.io/filters/docs/', note: 'Displacement and shader effects, batteries included.' },
    ],
  },
  {
    slug: 'babylon-js',
    name: 'Babylon.js',
    tagline: 'A full engine, tooling included',
    description:
      'A complete 3D engine with a node material editor, physics, XR and an in-browser playground — the most batteries-included option on the web.',
    url: 'https://www.babylonjs.com',
    category: 'webgl',
    tags: ['3d', 'engine', 'xr'],
    embeddable: true,
    install: { type: 'npm', target: '@babylonjs/core' },
    makers: [{ name: 'David Catuhe', role: 'Co-creator', x: 'deltakosh', github: 'deltakosh' }],
    best: [
      { title: 'Babylon.js Playground', url: 'https://playground.babylonjs.com', note: 'The best 3D scratchpad on the web.' },
      { title: 'Node Material Editor', url: 'https://nme.babylonjs.com', note: 'Shader graphs in the browser.' },
    ],
  },
  {
    slug: 'ogl',
    name: 'OGL',
    tagline: 'Minimal WebGL, nothing hidden',
    description:
      'A tiny, unopinionated WebGL library that stays close to the API. The right pick when you want shader control without an engine in the way.',
    url: 'https://oframe.github.io/ogl/examples',
    category: 'webgl',
    tags: ['webgl', 'minimal', 'shaders'],
    embeddable: true,
    install: { type: 'npm', target: 'ogl' },
    makers: [{ name: 'Nathan Gordon', role: 'Creator', x: 'gordonnl', github: 'gordonnl' }],
    best: [
      { title: 'OGL examples', url: 'https://oframe.github.io/ogl/examples', note: 'Small, readable WebGL demos.' },
      { title: 'OGL source', url: 'https://github.com/oframe/ogl', note: 'A codebase you can actually finish reading.' },
    ],
  },
  {
    slug: 'curtains-js',
    name: 'Curtains.js',
    tagline: 'Turn DOM elements into WebGL planes',
    description:
      'A library for shading images and videos in place, keeping the HTML layout as the source of truth. The classic route to hover-distortion galleries.',
    url: 'https://www.curtainsjs.com',
    category: 'webgl',
    tags: ['webgl', 'dom', 'images'],
    embeddable: true,
    install: { type: 'npm', target: 'curtainsjs' },
    makers: [{ name: 'Martin Laxenaire', role: 'Creator', github: 'martinlaxenaire', site: 'https://www.martin-laxenaire.fr' }],
    best: [
      { title: 'Curtains.js', url: 'https://www.curtainsjs.com', note: 'WebGL that respects your DOM layout.' },
      { title: 'gpu-curtains', url: 'https://martinlaxenaire.github.io/gpu-curtains/', note: 'The WebGPU successor.' },
    ],
  },
  {
    slug: 'cobe',
    name: 'Cobe',
    tagline: '5kB of globe',
    description:
      'A tiny WebGL globe component with dotted continents and buttery rotation. Proof that one focused component can define a visual era.',
    url: 'https://cobe.vercel.app',
    category: 'webgl',
    tags: ['webgl', 'globe', 'tiny'],
    embeddable: true,
    install: { type: 'npm', target: 'cobe' },
    makers: [{ name: 'Shu Ding', role: 'Creator', x: 'shuding_', github: 'shuding', site: 'https://shud.in' }],
    best: [
      { title: 'Cobe', url: 'https://cobe.vercel.app', note: 'The globe on a hundred landing pages.' },
      { title: 'Satori', url: 'https://github.com/vercel/satori', note: 'HTML and CSS to SVG, which became OG images.' },
    ],
  },
  {
    slug: 'basement-studio',
    name: 'basement.studio',
    tagline: 'A studio that ships WebGL to production',
    description:
      'Design and engineering studio known for shader-heavy product sites and for open-sourcing the pieces — a masterclass in shipping heavy visuals fast.',
    url: 'https://basement.studio',
    category: 'webgl',
    tags: ['studio', 'webgl', 'inspiration'],
    embeddable: true,
    makers: [{ name: 'Julian Benegas', role: 'CEO', x: 'julianbenegas8', github: 'julianbenegas' }],
    best: [
      { title: 'basement.studio', url: 'https://basement.studio', note: 'A 3D office you can walk through in a browser.' },
      { title: 'basement laboratory', url: 'https://github.com/basementstudio', note: 'Their internal tooling, in the open.' },
    ],
  },

  /* ----------------------------- SHADERS ----------------------------- */
  {
    slug: 'paper-shaders',
    name: 'Paper Shaders',
    tagline: 'Zero-dependency animated shader backgrounds',
    description:
      'A set of tiny, tweakable shader components — mesh gradients, grain clouds, dithering, metaballs — sized for real marketing pages rather than demos.',
    url: 'https://shaders.paper.design',
    category: 'shaders',
    tags: ['glsl', 'react', 'gradient', 'background'],
    embeddable: true,
    install: { type: 'npm', target: '@paper-design/shaders-react' },
    makers: [
      { name: 'Ksenia Kondrashova', role: 'Shader engineering', x: 'ksenia_code', github: 'ksenia-kondrashova' },
      { name: 'Paper', role: 'Studio', x: 'paper', site: 'https://paper.design' },
    ],
    best: [
      { title: 'Paper Shaders', url: 'https://shaders.paper.design', note: 'Production-ready shader backgrounds.' },
      { title: 'Paper', url: 'https://paper.design', note: 'A design tool built on the same rendering work.' },
    ],
    featured: true,
  },
  {
    slug: 'shadertoy',
    name: 'Shadertoy',
    tagline: 'Where the shader canon lives',
    description:
      'The community playground for fragment shaders. Two decades of raymarching, noise and SDF technique, all readable and remixable.',
    url: 'https://www.shadertoy.com',
    category: 'shaders',
    tags: ['glsl', 'community', 'raymarching'],
    embeddable: false,
    makers: [
      { name: 'Iñigo Quílez', role: 'Co-creator', x: 'iquilezles', site: 'https://iquilezles.org' },
      { name: 'Pol Jeremias', role: 'Co-creator', x: 'poljeremias' },
    ],
    best: [
      { title: 'Shadertoy', url: 'https://www.shadertoy.com', note: 'The shared library of shader technique.' },
      { title: 'iquilezles.org articles', url: 'https://iquilezles.org/articles/', note: 'The SDF and noise reference, full stop.' },
    ],
    featured: true,
  },
  {
    slug: 'shader-gradient',
    name: 'ShaderGradient',
    tagline: 'Editable 3D gradients for web and Figma',
    description:
      'A visual editor that outputs animated shader gradients as React components or Figma layers — the fastest path from idea to a moving background.',
    url: 'https://www.shadergradient.co',
    category: 'shaders',
    tags: ['gradient', 'react', 'figma', 'editor'],
    embeddable: true,
    install: { type: 'npm', target: '@shadergradient/react' },
    makers: [{ name: 'Ruucm', role: 'Creator', x: 'ruucm', github: 'ruucm' }],
    best: [
      { title: 'ShaderGradient', url: 'https://www.shadergradient.co', note: 'Configure a gradient, export the code.' },
      { title: 'ShaderGradient for Figma', url: 'https://www.figma.com/community/plugin/1015575328627216568', note: 'The same engine inside design files.' },
    ],
  },
  {
    slug: 'lygia',
    name: 'Lygia',
    tagline: 'A shader standard library',
    description:
      'A multi-language shader library of noise, lighting, color and SDF functions that works across GLSL, HLSL, WGSL and Metal — stop rewriting simplex noise.',
    url: 'https://lygia.xyz',
    category: 'shaders',
    tags: ['glsl', 'wgsl', 'library', 'noise'],
    embeddable: true,
    makers: [{ name: 'Patricio Gonzalez Vivo', role: 'Creator', x: 'patriciogv', github: 'patriciogonzalezvivo' }],
    best: [
      { title: 'Lygia', url: 'https://lygia.xyz', note: 'The shader standard library.' },
      { title: 'The Book of Shaders', url: 'https://thebookofshaders.com', note: 'How most of us learned GLSL.' },
    ],
    featured: true,
  },
  {
    slug: 'tsl',
    name: 'Three.js Shading Language',
    tagline: 'Write shaders in JavaScript, compile to WGSL or GLSL',
    description:
      'A node-based shading language inside Three.js that targets both WebGPU and WebGL — composable materials without string concatenation.',
    url: 'https://threejs.org/docs/#api/en/nodes/core/Node',
    category: 'shaders',
    tags: ['tsl', 'webgpu', 'three', 'nodes'],
    embeddable: true,
    install: { type: 'npm', target: 'three' },
    makers: [{ name: 'Renato Foot (sunag)', role: 'TSL lead', github: 'sunag' }],
    best: [
      { title: 'TSL wiki', url: 'https://github.com/mrdoob/three.js/wiki/Three.js-Shading-Language', note: 'The full node reference.' },
      { title: 'WebGPU examples', url: 'https://threejs.org/examples/?q=webgpu', note: 'TSL running in production form.' },
    ],
  },

  /* ------------------------------ TOOLS ------------------------------ */
  {
    slug: 'tailwind-css',
    name: 'Tailwind CSS',
    tagline: 'The constraint system underneath everything here',
    description:
      'Utility-first CSS with a real design-token layer. v4 moved configuration into CSS itself and made the whole thing dramatically faster.',
    url: 'https://tailwindcss.com',
    category: 'tools',
    tags: ['css', 'tokens', 'utility'],
    embeddable: true,
    install: { type: 'npm', target: 'tailwindcss' },
    makers: [
      { name: 'Adam Wathan', role: 'Co-founder', x: 'adamwathan', github: 'adamwathan' },
      { name: 'Steve Schoger', role: 'Co-founder', x: 'steveschoger' },
    ],
    best: [
      { title: 'Tailwind CSS', url: 'https://tailwindcss.com', note: 'Constraints that made teams consistent.' },
      { title: 'Refactoring UI', url: 'https://www.refactoringui.com', note: 'The book that taught developers to see.' },
    ],
    featured: true,
  },
  {
    slug: 'radix-colors',
    name: 'Radix Colors',
    tagline: 'Twelve steps, designed for states',
    description:
      'Color scales where every step has a job — backgrounds, borders, hover, solid, text — with automatic dark mode and accessible pairings.',
    url: 'https://www.radix-ui.com/colors',
    category: 'tools',
    tags: ['color', 'tokens', 'a11y'],
    embeddable: true,
    install: { type: 'npm', target: '@radix-ui/colors' },
    makers: [{ name: 'Colm Tuite', role: 'Creator', x: 'colmtuite', github: 'colmtuite' }],
    best: [
      { title: 'Radix Colors', url: 'https://www.radix-ui.com/colors', note: 'Scales built around UI states.' },
      { title: 'Radix Themes', url: 'https://www.radix-ui.com/themes', note: 'The scales applied as a full theme.' },
    ],
  },
  {
    slug: 'oklch-picker',
    name: 'OKLCH Color Picker',
    tagline: 'Perceptual color, with the gamut drawn for you',
    description:
      'An OKLCH picker that shows exactly where you leave sRGB and P3. The fastest way to build a palette with even perceived lightness.',
    url: 'https://oklch.com',
    category: 'tools',
    tags: ['color', 'oklch', 'gamut'],
    embeddable: false,
    makers: [{ name: 'Andrey Sitnik', role: 'Creator', x: 'sitnikcode', github: 'ai', site: 'https://sitnik.ru' }],
    best: [
      { title: 'OKLCH picker', url: 'https://oklch.com', note: 'Perceptual color made legible.' },
      { title: 'PostCSS', url: 'https://postcss.org', note: 'The CSS toolchain everything else builds on.' },
    ],
  },
  {
    slug: 'lucide',
    name: 'Lucide',
    tagline: '1,500+ icons that stay consistent',
    description:
      'A community-run icon set with a strict 24px grid and stroke system, available for every framework and tree-shakeable per icon.',
    url: 'https://lucide.dev',
    category: 'tools',
    tags: ['icons', 'svg'],
    embeddable: true,
    install: { type: 'npm', target: 'lucide-react' },
    makers: [
      { name: 'Lucide contributors', role: 'Community', github: 'lucide-icons', site: 'https://lucide.dev' },
      { name: 'Cole Bemis', role: 'Feather author', x: 'colebemis', github: 'colebemis' },
    ],
    best: [
      { title: 'Lucide', url: 'https://lucide.dev', note: 'The default icon set of the shadcn era.' },
      { title: 'Feather', url: 'https://feathericons.com', note: 'The original set Lucide grew from.' },
    ],
  },
  {
    slug: 'phosphor-icons',
    name: 'Phosphor Icons',
    tagline: 'Six weights, one voice',
    description:
      'A flexible icon family with thin through fill weights and a duotone option — the most expressive open icon system available.',
    url: 'https://phosphoricons.com',
    category: 'tools',
    tags: ['icons', 'svg', 'type'],
    embeddable: true,
    install: { type: 'npm', target: '@phosphor-icons/react' },
    makers: [
      { name: 'Helena Zhang', role: 'Co-creator', x: 'helenazhang', site: 'https://helenazhang.com' },
      { name: 'Tobias Fried', role: 'Co-creator', github: 'rektdeckard' },
    ],
    best: [
      { title: 'Phosphor Icons', url: 'https://phosphoricons.com', note: 'Weight as a design dimension.' },
      { title: 'Phosphor on GitHub', url: 'https://github.com/phosphor-icons', note: 'Runtimes for every platform.' },
    ],
  },
  {
    slug: 'codrops',
    name: 'Codrops',
    tagline: 'The archive of front-end experiments',
    description:
      'Two decades of tutorials and demos on WebGL, scroll effects, grid transitions and type animation. Still where technique gets documented first.',
    url: 'https://tympanus.net/codrops/',
    category: 'tools',
    tags: ['tutorials', 'inspiration', 'webgl'],
    embeddable: true,
    makers: [{ name: 'Manoela Ilic', role: 'Founder', x: 'crnacura', site: 'https://tympanus.net/codrops/' }],
    best: [
      { title: 'Codrops', url: 'https://tympanus.net/codrops/', note: 'The tutorial archive of the web.' },
      { title: 'Codrops Playground', url: 'https://tympanus.net/codrops/category/playground/', note: 'Experiments with the source attached.' },
    ],
    featured: true,
  },
]

export const FEATURED = ENTRIES.filter((e) => e.featured)

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

export function relatedEntries(entry: Entry, count = 3) {
  return ENTRIES.filter((e) => e.slug !== entry.slug && e.category === entry.category).slice(0, count)
}

export const MAKER_COUNT = new Set(ENTRIES.flatMap((e) => e.makers.map((m) => m.name))).size
