/* eslint-disable @typescript-eslint/no-explicit-any */
import ProfileHeader from '@/components/shared/ProfileHeader'
import { fetchUser } from '@/lib/actions/user.action'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Image from 'next/image'
import ThreadsTab from '@/components/shared/ThreadsTab'
import { fetchCommunityDetails } from '@/lib/actions/community.actions'
import { communityTabs } from '@/lib/constants'
import UserCard from '@/components/cards/UserCard'

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const Params = await params
  const { id } = Params
  const user = await currentUser()
  if (!user) {
    redirect('/sign-in')
  }
  const userinfo = await fetchUser(user.id)
  //   console.log('user info', userinfo)

  if (!userinfo?.data?.onboarded) {
    redirect('/onboarding')
  }
  const communityDetails = await fetchCommunityDetails(id)
  return (
    <>
      <div className=''>
        <ProfileHeader
          accounId={communityDetails?._id}
          authuserid={user?.id}
          name={communityDetails?.name}
          username={communityDetails?.username}
          image={communityDetails?.image}
          bio={communityDetails?.bio}
          type='community'
        />
      </div>
      <div className='mt-9'>
        <Tabs defaultValue='threads' className='w-full'>
          <TabsList className='flex w-full  flex-1 items-center gap-3 bg-dark-2 text-light-2 data-[state=active]:bg-[#0e0e12] data-[state=active]:text-light-2 '>
            {communityTabs.map((tab) => (
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
                    {communityDetails.threads.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value='threads' className='w-full text-light-1'>
            <ThreadsTab
              userId={userinfo?.data?.id}
              accountId={communityDetails._id}
              accountType='community'
            />
          </TabsContent>
          <TabsContent value='members' className='w-full text-light-1'>
            <div className='mt-5 flex flex-col gap-10'>
              {communityDetails.members.map((member: any) => (
                <UserCard
                  key={member.id}
                  id={member.id}
                  username={member.username}
                  name={member.name}
                  profileimage={member.profileimage}
                  personType='user'
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value='requests' className='w-full text-light-1'>
            <ThreadsTab
              userId={userinfo?.data?.id}
              accountId={communityDetails._id}
              accountType='community'
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

export default page
