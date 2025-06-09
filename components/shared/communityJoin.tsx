'use client'
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
// import { addMemberToCommunity } from '@/lib/actions/community.actions'

type Props = {
  userid?: string
  members: {
    id: string
    username: string
    name: string
    profileimage: string
  }[]
  communityid?: string
}

const CommunityJoin = ({ userid, communityid, members }: Props) => {
  //   console.log('members', members, 'userid', userid, 'communityid', communityid)
  const router = useRouter()
  const isMember = members.some((m) => m.id === userid)
  const handleJoin = async () => {
    if (!communityid || !userid) {
      console.error('Community ID or User ID is missing')
      return
    }
    try {
      // await addMemberToCommunity(communityid, userid)

      await fetch('/api/clerk/add-to-org', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userid,
          orgId: communityid,
          role: 'org:member', // or 'admin' if needed
        }),
      })

      router.refresh()
    } catch (err) {
      console.error('Failed to join community', err)
    }
  }

  return (
    <>
      {!isMember && (
        <Button onClick={handleJoin} className='bg-primary-500 text-sm'>
          Join
        </Button>
      )}
    </>
  )
}

export default CommunityJoin
