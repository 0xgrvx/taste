import type { Install } from './registry'

export const MANAGERS = ['pnpm', 'npm', 'yarn', 'bun'] as const
export type Manager = (typeof MANAGERS)[number]

export function installCommand(install: Install, pm: Manager) {
  if (install.type === 'shadcn') {
    switch (pm) {
      case 'pnpm':
        return `pnpm dlx shadcn@latest add ${install.target}`
      case 'npm':
        return `npx shadcn@latest add ${install.target}`
      case 'yarn':
        return `yarn dlx shadcn@latest add ${install.target}`
      case 'bun':
        return `bunx --bun shadcn@latest add ${install.target}`
    }
  }

  switch (pm) {
    case 'pnpm':
      return `pnpm add ${install.target}`
    case 'npm':
      return `npm install ${install.target}`
    case 'yarn':
      return `yarn add ${install.target}`
    case 'bun':
      return `bun add ${install.target}`
  }
}
