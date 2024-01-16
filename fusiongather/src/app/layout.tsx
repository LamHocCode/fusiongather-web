import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import ContextProvider from '@/context/ContextProvider'

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})


export const metadata: Metadata = {
  title: {
    default: 'Fasion Gather',
    template: `%s | Fasion Gather`,
  },
  description: 'Manage event',
  verification: {
    google: "google-site-verification=123321123"
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={roboto.className}>
          <Toaster
            toastOptions={{
              style: {
                background: 'rgb(51 65 85',
                color: '#fff'
              }
            }}
          />
          <ContextProvider>
            {children}
          </ContextProvider>
        </body>
      </html>
    </SessionProvider>
  )
}
