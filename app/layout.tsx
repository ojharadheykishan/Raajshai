import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'राजशाही शर्बत - Premium Sharbat & Beverages',
  description: 'Discover our collection of premium sharbat and traditional beverages. Shop the finest quality drinks from राजशाही शर्बत.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
