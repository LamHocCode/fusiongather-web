

import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import ContextProvider from '@/context/ContextProvider'
import TableNextUIProvider from '@/context/TableNextUIProvider'
import { Table } from '@nextui-org/react'



const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})


export const metadata: Metadata = {
  title: {
    default: 'Fusion Gather',
    template: `%s | Fusion Gather`,
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
          <TableNextUIProvider>
          <ContextProvider>
            {children}
          </ContextProvider> 
          </TableNextUIProvider>                  
        </body>
      </html>
    </SessionProvider>
  )
}
