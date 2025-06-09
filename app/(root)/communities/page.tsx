/* eslint-disable @typescript-eslint/no-explicit-any */
import CommunitiCard from '@/components/cards/CommunitiCard'
import SearchBar from '@/components/shared/SearchBar'
import { fetchCommunities } from '@/lib/actions/community.actions'
import { fetchUserById } from '@/lib/actions/user.action'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    searchString?: string
  }>
}) => {
  const searchparams = await searchParams
  const { searchString = '' } = searchparams
  const user = await currentUser()
  if (!user) {
    redirect('/sign-in')
  }
  const userinfo = await fetchUserById(user.id)

  if (!userinfo?.data?.onboarded) {
    redirect('/onboarding')
  }

  const community = await fetchCommunities({
    searchString,
    pageNumber: 1,
    sortBy: 'desc',
  })
  // console.log('users', community)

  return (
    <div>
      <h1 className='text-heading2-bold text-light-1'>Search</h1>
      <div className='mt-9 flex flex-col gap-9'>
        {community?.data?.length === 0 ? (
          <p className=' text-center !text-base-regular text-light-3'>
            No users
          </p>
        ) : (
          <div className=''>
            <SearchBar type='community' />
            <div className=' grid grid-cols-1 md:grid-cols-2 gap-4 '>
              {community?.data?.map((person: any) => (
                <CommunitiCard
                  key={person.id}
                  id={person.id}
                  username={person.username}
                  name={person.name}
                  image={person.image}
                  bio={person.bio}
                  members={person.members.map((m: any) => ({
                    id: m.id,
                    username: m.username,
                    name: m.name,
                    profileimage: m.profileimage,
                  }))}
                  currentUserId={user.id}
                  communityId={person.id}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default page
