import './globals.css'

import Script from 'next/script'

import Header from '@/components/Header'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Cody's Tasks",
  description: 'A simple task manager',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className='bg-background text-foreground'>
        <main className='min-h-screen flex flex-col items-center gap-y-4'>
          <Header />
          <Script id='harvest' strategy='afterInteractive'>
            {`
              window._harvestPlatformConfig = {
                "applicationName": "TMV Social",
                "skipStyling": true
              };
            `}
          </Script>
          <Script
            src='https://platform.harvestapp.com/assets/platform.js'
            strategy='afterInteractive'
            async
          />
          {children}
        </main>
      </body>
    </html>
  )
}
