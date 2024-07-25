import './globals.css'

import type { Viewport } from 'next'
import Script from 'next/script'
import { Suspense } from 'react'

import Header from '@/components/Header'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Cody's Tasks",
  description: 'A simple task manager',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'cyan' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  colorScheme: 'dark light',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Script id="harvest" strategy="afterInteractive">
        {`
        window._harvestPlatformConfig = {
          "applicationName": "TMV Social",
          "skipStyling": true
        };
      `}
      </Script>
      <Script
        src="https://platform.harvestapp.com/assets/platform.js"
        strategy="afterInteractive"
        async
      />
      <body className="bg-background text-foreground">
        <Header />
        <main className="flex min-h-screen flex-col items-center gap-y-4 pt-2">
          {children}
        </main>
      </body>
    </html>
  )
}
