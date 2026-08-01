import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { PreviewProvider } from '@/components/preview-layer'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import './globals.css'

const _geistSans = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://taste.11xui.com'),
  title: {
    default: 'Taste — a curated index of UI, motion and WebGL craft',
    template: '%s — Taste',
  },
  description:
    'Taste is a hand-picked index of UI libraries, animation kits, shaders and WebGL tools built by people with exceptional craft. Hover to preview, copy the install command, meet the makers.',
  keywords: [
    'UI libraries',
    'shadcn registry',
    'animation libraries',
    'WebGL',
    'shaders',
    'design engineering',
    'React components',
  ],
  authors: [{ name: 'Taste' }],
  openGraph: {
    title: 'Taste — a curated index of UI, motion and WebGL craft',
    description:
      'Hand-picked UI libraries, motion kits, shaders and WebGL tools. Live hover previews, install commands, and the people behind them.',
    url: 'https://taste.11xui.com',
    siteName: 'Taste',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Taste — a curated index of UI, motion and WebGL craft',
    description:
      'Hand-picked UI libraries, motion kits, shaders and WebGL tools. Live hover previews and install commands.',
  },
  generator: 'v0.app',
  manifest: '/manifest.json',
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#111111',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="bg-background text-foreground font-sans antialiased">
        <PreviewProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </PreviewProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
