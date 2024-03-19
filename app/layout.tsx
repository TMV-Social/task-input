import './globals.css'

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
        <main className='min-h-screen flex flex-col items-center gap-4'>
          <Header />
          {children}
        </main>
      </body>
    </html>
  )
}
