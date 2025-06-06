import Image from 'next/image'
import React from 'react'
import { buttonVariants } from '../ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type UserCardProps = {
  id: string
  username: string
  name: string
  profileimage: string
  personType: string
}

const UserCard = ({
  id,
  username,
  name,
  profileimage,
}: // personType,
UserCardProps) => {
  return (
    <div className='flex items-center justify-between w-full '>
      <div className='flex gap-4 flex-1 '>
        <Image
          src={profileimage}
          alt={`${name}'s profile image`}
          width={40}
          height={40}
          className='rounded-full object-cover'
        />
        <div className=''>
          <h2 className='font-bold text-light-1'>{name}</h2>
          <p className='text-sm text-gray-1'>@{username}</p>
        </div>
      </div>
      <Link
        className={cn(
          buttonVariants({
            variant: 'outline',
            className: 'bg-primary-500 outline-none border-none text-light-1',
          })
        )}
        href={`/profile/${id}`}
      >
        View
      </Link>
    </div>
  )
}

export default UserCard
