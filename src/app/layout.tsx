import type { Metadata } from 'next'
import './globals.css'
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'PermGuard - AI Coding Permission Governance',
  description: 'Stop running --dangerously-skip-permissions. PermGuard gives teams audit trails, approval workflows, and reusable permission templates.',
  openGraph: {
    title: 'PermGuard - AI Coding Permission Governance',
    description: 'Stop running --dangerously-skip-permissions. PermGuard gives teams audit trails, approval workflows, and reusable permission templates.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>{children}</body>
    </html>
  )
}