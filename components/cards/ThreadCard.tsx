import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type ThreadCardProps = {
  id: string
  currentUserId: string
  parrentId?: string | null
  content: string
  createdAt: Date
  author: {
    _id: string
    name: string
    username: string
    profileimage: string
  }
  community?: {
    id: string
    name: string
    image: string
  } | null
  comments?: {
    author: {
      image: string
    }
  }[]
  iscomment?: boolean
}
const ThreadCard = ({
  id,
  // currentUserId,
  // parrentId,
  content,
  // createdAt,
  author,
  // community,
  comments,
  iscomment,
}: ThreadCardProps) => {
  return (
    <div className='mt-3  flex w-full flex-col rounded-xl bg-dark-2 p-7 '>
      <div className='flex items-start justify-between'>
        <div className='flex w-full flex-1 flex-row gap-4 '>
          <div className='flex flex-col items-center'>
            <Link
              href={`/profile/${author._id}`}
              className='relative h-11 w-11'
            >
              <Image
                src={author.profileimage}
                alt='user_community_image'
                fill
                className='cursor-pointer object-cover rounded-full'
              />
            </Link>

            <div className=' relative mt-2 w-0.5 grow rounded-full bg-neutral-800' />
          </div>
          <div className='flex w-full flex-col'>
            <Link href={`/profile/${author._id}`} className='w-fit'>
              <h4 className='cursor-pointer font-semibold text-light-1'>
                {author.name}
              </h4>
            </Link>
            <p className='mt-1 text-sm text-light-2'>{content}</p>
            <div className={` mt-5 flex flex-col gap-3`}>
              <div className='flex gap-3.5'>
                <Image
                  src='/assets/heart-gray.svg'
                  alt='heart'
                  width={24}
                  height={24}
                  className='cursor-pointer object-contain'
                />
                <Link href={`/thread/${id}`}>
                  <Image
                    src='/assets/reply.svg'
                    alt='heart'
                    width={24}
                    height={24}
                    className='cursor-pointer object-contain'
                  />
                </Link>
                <Image
                  src='/assets/repost.svg'
                  alt='heart'
                  width={24}
                  height={24}
                  className='cursor-pointer object-contain'
                />
                <Image
                  src='/assets/share.svg'
                  alt='heart'
                  width={24}
                  height={24}
                  className='cursor-pointer object-contain'
                />
              </div>
              {iscomment && comments && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className='mt-1 text-sm text-gray-1'>
                    {comments.length}replies
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThreadCard
