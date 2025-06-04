import PostThread from '@/components/forms/PostThread'
import { fetchUserById } from '@/lib/actions/user.action'
import { currentUser } from '@clerk/nextjs/server'
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

  return (
    <div className='text-white'>
      <h1 className='text-heading2-bold text-light-1'>Create Thread</h1>
      <PostThread userId={userinfo?.data?._id} />
    </div>
  )
}

export default page
