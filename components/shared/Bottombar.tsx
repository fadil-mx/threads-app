'use client'
import { sidebarLinks } from '@/lib/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
const Bottombar = () => {
  const pathname = usePathname()
  return (
    <div className='fixed bottom-0 z-10 w-full p-4 bg-glassmorphism backdrop-blur-lg sm:px-7 sm:hidden '>
      <div className=' flex items-center justify-between gap-3 sm:gap-5 '>
        {sidebarLinks.map((item, index) => {
          return (
            <Link
              href={item.route}
              key={index}
              className={cn(
                pathname.includes(item.route) ? 'bg-primary-500' : '',
                'text-light-1  relative flex flex-col items-center gap-2 rounded-lg p-2 sm:flex-1 sm:px-2 sm:py-2.5'
              )}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={24}
                height={24}
              />
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Bottombar
