import Accountprofile from '@/components/forms/Accountprofile'
import { fetchUser } from '@/lib/actions/user.action'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
  const user = await currentUser()

  // type UserInfo = {
  //   _id?: string
  //   username?: string
  //   name?: string
  //   bio?: string
  //   image?: string
  // }

  const userinfo = await fetchUser(user?.id || '')
  if (userinfo?.data?.onboarded) {
    redirect('/')
  }

  const userData = {
    id: user?.id || '',
    objectid: userinfo?.data._id || '',
    username: userinfo?.data.username || user?.firstName || '',
    name: userinfo?.data.name || user?.fullName || '',
    bio: userinfo?.data.bio || '',
    image: userinfo?.data.image || user?.imageUrl || '',
  }
  return (
    <div className='bg-black min-h-screen '>
      <div className='  text-white max-w-3xl mx-auto flex flex-col  justify-start px-10 py-10'>
        <h1 className='text-2xl font-bold '>Onboarding</h1>
        <p className=' text-light-2 mt-3 '>
          Complete your profile now and use Threads
        </p>
        <div className='bg-dark-2 mt-9 p-10'>
          <Accountprofile user={userData} btnTitle='Countinue' />
        </div>
      </div>
    </div>
  )
}

export default page
