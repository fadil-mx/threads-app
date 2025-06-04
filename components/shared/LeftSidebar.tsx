'use client'
import { sidebarLinks } from '@/lib/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SignedIn, SignOutButton } from '@clerk/nextjs'

import React from 'react'

const LeftSidebar = () => {
  const pathname = usePathname()
  return (
    <div className=' sticky left-0 top-0 z-20 flex h-screen w-fit flex-col justify-between overflow-auto border-r border-r-dark-4 bg-dark-2 pb-5 pt-24  max-sm:hidden '>
      <div className='flex flex-col flex-1 w-full px-4 '>
        {sidebarLinks.map((item, index) => {
          return (
            <Link
              href={item.route}
              key={index}
              className={cn(
                pathname === item.route ||
                  (pathname.startsWith(item.route) && item.route !== '/')
                  ? 'bg-primary-500'
                  : '',
                'text-light-1 flex items-center gap-4 rounded-lg p-4'
              )}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={24}
                height={24}
              />
              <p className='block max-md:hidden'>{item.label}</p>
            </Link>
          )
        })}
      </div>
      <div className='px-6 '>
        <SignedIn>
          <SignOutButton>
            <div className='flex gap-2 cursor-pointer'>
              <Image
                src='/assets/logout.svg'
                alt='Logo'
                width={24}
                height={24}
                className='rounded-full'
              />
              <p className='text-light-1 max-lg:hidden'>Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </div>
  )
}

export default LeftSidebar
