import { OrganizationSwitcher, SignedIn, SignOutButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { dark } from '@clerk/themes'

const Topbar = () => {
  return (
    <div className='fixed top-0 z-30  flex w-full items-center justify-between bg-dark-2 px-6 py-3'>
      <Link href='/' className='flex items-center gap-2'>
        <Image
          src='/assets/logo.svg'
          alt='Logo'
          width={28}
          height={28}
          className='rounded-full'
        />
        <p className='text-white text-heading3-bold'>Threads</p>
      </Link>

      <div className='flex items-center text-white'>
        <div className='block md:hidden'>
          <SignedIn>
            <SignOutButton>
              <Image
                src='/assets/logout.svg'
                alt='Logo'
                width={28}
                height={28}
                className='rounded-full'
              />
            </SignOutButton>
          </SignedIn>
        </div>
        <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: 'py-2 px-4',
              userPreviewMainIdentifierText: 'max-md:hidden',
              organizationSwitcherPopoverFooter: 'bg-red-100',
            },
          }}
        />
      </div>
    </div>
  )
}

export default Topbar
