import type { Metadata } from 'next'
import './globals.css'
import { Inter, JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600'],
});

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
    <html lang="en" className={cn("font-sans", inter.variable, jetbrains.variable)}>
      <body className="bg-cream dark:bg-dark-bg text-warm-black dark:text-white antialiased">
        {children}
      </body>
    </html>
  )
}