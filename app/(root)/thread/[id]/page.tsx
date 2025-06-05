/* eslint-disable @typescript-eslint/no-explicit-any */
import ThreadCard from '@/components/cards/ThreadCard'
import Comment from '@/components/forms/comment'
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
    <>
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
      <div className=' mt-7'>
        <Comment
          id={thread.data._id}
          currentUserimage={userinfo.data?.profileimage || ''}
          currentUserId={userinfo?.data?._id || ''}
        />
      </div>
      <div className='mt-10'>
        {thread.data.children?.map((comment: any) => (
          <ThreadCard
            key={comment._id}
            id={comment._id}
            currentUserId={user?.id || ''}
            parrentId={thread.data._id}
            content={comment.text}
            author={comment.author}
            createdAt={comment.createdAt}
            iscomment={true}
          />
        ))}
      </div>
    </>
  )
}

export default page
