import ProfileHeader from '@/components/shared/ProfileHeader'
import { fetchUser } from '@/lib/actions/user.action'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { profileTabs } from '@/lib/constants'
import Image from 'next/image'

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const Params = await params
  const { id } = Params
  const user = await currentUser()
  if (!user) {
    redirect('/sign-in')
  }
  const userinfo = await fetchUser(id)
  // console.log('user info', userinfo)

  if (!userinfo?.data?.onboarded) {
    redirect('/onboarding')
  }
  return (
    <>
      <div className=''>
        <ProfileHeader
          accounId={userinfo?.data?._id}
          authuserid={user?.id}
          name={userinfo?.data?.name}
          username={userinfo?.data?.username}
          image={userinfo?.data?.profileimage}
          bio={userinfo?.data?.bio}
        />
      </div>
      <div className='mt-9'>
        <Tabs defaultValue='threads' className='w-full'>
          <TabsList className='flex w-full  flex-1 items-center gap-3 bg-dark-2 text-light-2 data-[state=active]:bg-[#0e0e12] data-[state=active]:text-light-2 '>
            {profileTabs.map((tab) => (
              <TabsTrigger
                key={tab.label}
                value={tab.value}
                className='flex  flex-1 items-center gap-3 bg-dark-2 text-light-2 data-[state=active]:bg-[#0e0e12] data-[state=active]:text-light-2 '
              >
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className='object-contain'
                />
                <p className='max-sm:hidden'>{tab.label}</p>
                {tab.label === 'Threads' && (
                  <p className=' ml-0 rounded-sm bg-light-4 px-[5px] text-tiny-medium  mb-1'>
                    {userinfo.data.threads.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {profileTabs.map((tab) => (
            <TabsContent
              key={tab.label}
              value={tab.value}
              className='w-full text-light-1'
            >
              <p className=''>dasdas</p>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  )
}

export default page
