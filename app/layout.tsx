import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import {
  Bricolage_Grotesque,
  Comic_Neue,
  Inter,
  JetBrains_Mono,
  Pacifico,
} from 'next/font/google'
import './globals.css'
import './presentation.css'
import './demos.css'

const comic = Comic_Neue({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-comic',
})
const pacifico = Pacifico({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-pacifico',
})
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
})
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'Front-end e UI/UX — Apresentação interativa',
  description:
    'Apresentação com rolagem sobre a importância do Front-end, UI/UX, responsividade e acessibilidade. O site começa ruim e melhora a cada slide.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#faf7f2',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      data-stage="0"
      suppressHydrationWarning
      className={`${comic.variable} ${pacifico.variable} ${inter.variable} ${bricolage.variable} ${mono.variable}`}
    >
      <body>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
