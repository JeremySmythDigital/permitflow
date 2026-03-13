import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PermitFlow - AI Coding Permission Governance',
  description: 'Stop running --dangerously-skip-permissions. PermitFlow gives teams audit trails, approval workflows, and reusable permission templates.',
  openGraph: {
    title: 'PermitFlow - AI Coding Permission Governance',
    description: 'Stop running --dangerously-skip-permissions. PermitFlow gives teams audit trails, approval workflows, and reusable permission templates.',
    type: 'website',
  },
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