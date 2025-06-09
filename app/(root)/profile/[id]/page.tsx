/* eslint-disable @typescript-eslint/no-explicit-any */
import ProfileHeader from '@/components/shared/ProfileHeader'
import { fetchUser, getActivity } from '@/lib/actions/user.action'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { profileTabs } from '@/lib/constants'
import Image from 'next/image'
import ThreadsTab from '@/components/shared/ThreadsTab'
import ThreadCard from '@/components/cards/ThreadCard'

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

  const replays = await getActivity(userinfo.data._id)
  // console.log('replays', replays)
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
          <TabsContent value='threads' className='w-full text-light-1'>
            <ThreadsTab
              userId={userinfo?.data?.id}
              accountId={userinfo?.data?.id}
              accountType='user'
            />
          </TabsContent>
          <TabsContent value='replies' className='w-full text-light-1'>
            {replays?.data?.length > 0 ? (
              <div className=''>
                {replays?.data?.map((thread: any) => (
                  <ThreadCard
                    key={thread._id}
                    id={thread._id}
                    currentUserId={user?.id || ''}
                    parrentId={thread.parentId || ''}
                    content={thread.text}
                    author={thread.author}
                    createdAt={thread.createdAt}
                    community={thread.community}
                    comments={thread.children || []}
                  />
                ))}
              </div>
            ) : (
              <div className=''>
                <h1 className='text-2xl text-light-1'> No replies</h1>
              </div>
            )}
          </TabsContent>
          <TabsContent value='tagged' className='w-full text-light-1'>
            <h1 className='text-light-1 w-full text-center text-2xl mt-8'>
              Comming Soon.....
            </h1>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

export default page
