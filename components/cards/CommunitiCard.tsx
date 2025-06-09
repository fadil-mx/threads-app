import Image from 'next/image'
import React from 'react'
import { buttonVariants } from '../ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import CommunityJoin from '../shared/communityJoin'

type Props = {
  id: string
  username: string
  name: string
  image: string
  bio?: string
  currentUserId?: string
  members: {
    id: string
    username: string
    name: string
    profileimage: string
  }[]
  communityId?: string
}

const CommunitiCard = ({
  currentUserId,
  id,
  username,
  name,
  image,
  bio,
  members,
  communityId,
}: Props) => {
  return (
    <div className=' w-full rounded-lg bg-dark-2 px-4 py-5 sm:w-96'>
      <div className='flex flex-col'>
        <div className=' flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <Link href={`/communities/${id}`}>
              <div className='relative h-10 w-10'>
                <Image
                  src={image}
                  alt={name}
                  fill
                  className=' rounded-full object-cover'
                />
              </div>
            </Link>
            <div className='flex flex-col'>
              <p className='text-base font-bold text-light-1'>{name}</p>
              <p className='text-sm text-gray-1'>@{username}</p>
            </div>
          </div>
          <CommunityJoin
            userid={currentUserId}
            communityid={communityId}
            members={members}
          />
        </div>
        <p className='text-light-2 mt-3  text-sm'>{bio}</p>
        <div className='mt-3 flex justify-between  '>
          <Link
            className={cn(
              buttonVariants({
                variant: 'default',
                size: 'sm',
                className: 'bg-primary-500',
              })
            )}
            href={`/communities/${id}`}
          >
            View
          </Link>
          {members.length > 0 && (
            <div className='flex items-center'>
              {members.map((member, index) => (
                <div className='relative h-8 w-8' key={index}>
                  <Image
                    src={member.profileimage}
                    alt={`user_${index}`}
                    fill
                    className={`${
                      index !== 0 && '-ml-2'
                    } rounded-full object-cover`}
                  />
                </div>
              ))}
              {members.length > 3 && (
                <p className='ml-1 text-subtle-medium text-gray-1'>
                  {members.length}+ Users
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CommunitiCard
