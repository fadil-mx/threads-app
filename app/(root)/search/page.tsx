/* eslint-disable @typescript-eslint/no-explicit-any */
import UserCard from '@/components/cards/UserCard'
import SearchBar from '@/components/shared/SearchBar'
import { fetchUserById, SearchUser } from '@/lib/actions/user.action'
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

  const users = await SearchUser({
    userId: user.id,
    searchString,
    page: 1,
    sortBy: 'desc',
  })
  //   console.log('users', users)

  return (
    <div>
      <h1 className='text-heading2-bold text-light-1'>Search</h1>
      <div className='mt-9 flex flex-col gap-9'>
        {users?.data?.length === 0 ? (
          <p className=' text-center !text-base-regular text-light-3'>
            No users
          </p>
        ) : (
          <div className=''>
            <SearchBar type='user' />
            {users?.data?.map((person: any) => (
              <UserCard
                key={person.id}
                id={person.id}
                username={person.username}
                name={person.name}
                profileimage={person.profileimage}
                personType='user'
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default page
