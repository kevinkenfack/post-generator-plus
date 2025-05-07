import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Post Generator Plus',
  description: 'Générateur de publication pour vos posts',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="FR">
      <body>{children}</body>
    </html>
  )
}
