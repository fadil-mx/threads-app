import Image from 'next/image'
import React from 'react'

type Props = {
  accounId: string
  authuserid: string
  name: string
  image: string
  bio: string
  username?: string
  type?: 'user' | 'community'
}

const ProfileHeader = ({
  // accounId,
  // authuserid,
  name,
  username,
  image,
  bio,
}: // type,
Props) => {
  return (
    <div className='fex w-full flex-col justify-start'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className=' relative h-20 w-20 object-cover'>
            <Image
              src={image}
              alt='profile image'
              fill
              className='rounded-full object-cover shadow-2xl'
            />
          </div>
          <div className='flex-1'>
            <h2 className=' text-white text-heading3-bold'>{name}</h2>
            <p className='text-gray-1 text-sm'>@{username}</p>
          </div>
        </div>
      </div>
      {/* community */}
      <p className='text-light-2 text-base-regular max-w-lg mt-6'>{bio}</p>
      <div className='mt-12 h-0.5 w-full bg-dark-3' />
    </div>
  )
}

export default ProfileHeader
