import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NOCHILL Viral Script Generator',
  description: 'Drop a topic. Get 5 ready-to-film scripts. No questions asked.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
