import ThreadCard from '@/components/cards/ThreadCard'
import { fetchThreadById } from '@/lib/actions/thread.action'
import { fetchUserById } from '@/lib/actions/user.action'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const Params = await params
  const { id } = await Params
  const user = await currentUser()
  if (!user) {
    redirect('/sign-up')
  }
  // console.log('user', user)

  const userinfo = await fetchUserById(user.id)
  // console.log(userinfo.data)
  if (!userinfo?.data?.onboarded) {
    redirect('/onboarding')
  }
  const thread = await fetchThreadById(id)
  // console.log(tread.data)
  return (
    <div>
      <ThreadCard
        key={thread.data._id}
        id={thread.data._id}
        currentUserId={user?.id || ''}
        parrentId={thread.data.parentId || ''}
        content={thread.data.text}
        author={thread.data.author}
        createdAt={thread.data.createdAt}
        community={thread.data.community}
        comments={thread.data.children || []}
      />
    </div>
  )
}

export default page
