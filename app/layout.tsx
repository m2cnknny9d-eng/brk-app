import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BRK Bayern Ehrenamtsapp',
  description: 'Verwaltung von Lehrgängen und Fortbildungen für BRK Bayern',
  viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-slate-900`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
