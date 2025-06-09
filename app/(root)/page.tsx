/* eslint-disable @typescript-eslint/no-explicit-any */
// import { UserButton } from '@clerk/nextjs'
import ThreadCard from '@/components/cards/ThreadCard'
import { fetchpost } from '@/lib/actions/thread.action'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

const Homepage = async () => {
  const threads = await fetchpost({ page: 1 })
  console.log('threads', threads)
  const user = await currentUser()

  return (
    <div className=' '>
      <h1 className=' text-heading2-bold text-light-1 text-left'>Home</h1>
      {threads?.data.length === 0 ? (
        <div className='text-center !text-base-regular text-light-3'>
          {' '}
          No threads found
        </div>
      ) : (
        <div className=''>
          {threads?.data.map((thread: any) => (
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
      )}
    </div>
  )
}

export default Homepage
