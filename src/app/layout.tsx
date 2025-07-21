import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import ReduxProvider from './reduxProvider'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '800'],
  variable: '--font-jakarta',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Auth Dashboard | Next.js App',
  description: 'Technical demo project featuring user authentication and data fetching from public APIs using Next.js.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}