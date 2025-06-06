import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import { ClerkProvider } from '@clerk/nextjs'

export const metadata: Metadata = {
  title: 'Auth Layout',
  description: 'Authentication layout for the application',
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body className={`${inter.className} bg-black`}>
        <div className='w-full flex justify-center items-center min-h-screen'>
          <ClerkProvider>{children} </ClerkProvider>
        </div>
      </body>
    </html>
  )
}
