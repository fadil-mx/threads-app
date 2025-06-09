/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchUserById, getActivity } from '@/lib/actions/user.action'
import { currentUser } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
  const user = await currentUser()
  if (!user) {
    redirect('/sign-in')
  }
  const userinfo = await fetchUserById(user.id)
  if (!userinfo?.data?.onboarded) {
    redirect('/onboarding')
  }
  const activity = await getActivity(userinfo.data._id)
  //   console.log('activity', activity)

  return (
    <div>
      <h1 className='text-heading2-bold text-light-1'>Activity</h1>
      <div className=''>
        {activity?.data?.length === 0 ? (
          <p className='text-gray-1 '>No activity</p>
        ) : (
          <div className='mt-12 flex flex-col gap-4'>
            {activity?.data?.map((item: any) => (
              <Link
                href={`/thread/${item.parentId}`}
                key={item._id}
                className='text-light-3 text-base-regular'
              >
                <div className='flex items-center gap-2 bg-dark-2 px-5 py-3 rounded-md '>
                  <div className='relative h-5 w-5'>
                    <Image
                      src={item?.author?.profileimage || '/default-avatar.png'}
                      alt='User Avatar'
                      fill
                      className='rounded-full object-cover '
                    />
                  </div>
                  <p className='  text-light-1'>
                    <span className='mr-1 text-primary-500'>
                      {item?.author.name}
                    </span>{' '}
                    replied to your thread{' '}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default page
