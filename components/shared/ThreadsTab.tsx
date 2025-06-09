/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchUserPost } from '@/lib/actions/user.action'
import React from 'react'
import ThreadCard from '../cards/ThreadCard'
import { fetchCommunityPosts } from '@/lib/actions/community.actions'

type ThreadsTabProps = {
  userId: string
  accountId: string
  accountType: string
}

const ThreadsTab = async ({
  userId,
  accountId,
  accountType,
}: ThreadsTabProps) => {
  let result
  if (accountType === 'community') {
    result = await fetchCommunityPosts(accountId)
    // console.log('result', result)
  } else {
    result = await fetchUserPost(userId)
  }
  // console.log('result', result)

  return (
    <div className=' flex flex-col gap-4'>
      {result?.data?.threads.map((thread: any) => (
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={userId}
          parrentId={thread.parentId || ''}
          content={thread.text}
          author={
            accountType === 'user'
              ? {
                  _id: result.data._id || '',
                  id: result.data.id || '',
                  name: result.data.name,
                  username: result.data.username || '',
                  profileimage: result.data.profileimage,
                }
              : {
                  _id: thread.author._id || '',
                  id: thread.author.id || '',
                  name: thread.author.name,
                  username: thread.author.username || '',
                  profileimage: thread.author.profileimage || '',
                }
          }
          createdAt={thread.createdAt}
          community={thread.communities}
          comments={thread.children || []}
        />
      ))}
    </div>
  )
}

export default ThreadsTab
