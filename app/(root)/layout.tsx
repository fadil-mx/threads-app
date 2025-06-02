import Bottombar from '@/components/shared/Bottombar'
import LeftSidebar from '@/components/shared/LeftSidebar'
import RightSidebar from '@/components/shared/RightSidebar'
import Topbar from '@/components/shared/Topbar'
import { ClerkProvider } from '@clerk/nextjs'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Threads',
  description: 'Shared social media platform',
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <html>
        <body className={`${inter.className} ${inter.variable}`}>
          <Topbar />
          <main className='flex flex-row'>
            <LeftSidebar />
            <section className=' main-container '>
              <div className='w-full max-w-4xl '>{children}</div>
            </section>
            <RightSidebar />
          </main>
          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  )
}
