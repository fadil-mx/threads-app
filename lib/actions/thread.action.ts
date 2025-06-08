/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'

import { revalidatePath } from 'next/cache'
import connectDB from '../db'
import Thread from '../db/models/Treadschema'
import User from '../db/models/userschema'
import { PAGE_SIZE } from '../constants'
import Community from '../db/models/communitySchema'

export async function createThread({
  text,
  author,
  community,
  path,
}: {
  text: string
  author: string
  community?: string | null
  path?: string
}) {
  try {
    await connectDB()
    const communityid = await Community.findOne({ id: community })
    const thread = await Thread.create({
      text,
      author,
      community: communityid ? communityid._id : null,
    })

    await User.findByIdAndUpdate(author, {
      $push: { threads: thread._id },
    })

    if (communityid) {
      // Update Community model
      await Community.findByIdAndUpdate(communityid._id, {
        $push: { threads: thread._id },
      })
    }

    revalidatePath(path ?? '/')

    return {
      success: true,
      message: 'Thread created successfully',
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to create thread',
    }
  }
}

export async function fetchpost({
  page = 1,
  limit,
}: {
  page?: number
  limit?: number
}) {
  limit = limit || PAGE_SIZE
  const skip = (page - 1) * limit
  try {
    await connectDB()
    const threads = await Thread.find({
      parentId: { $in: [null, undefined] },
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate({
        path: 'author',
        model: User,
      })
      .populate({
        path: 'community',
        model: Community,
      })
      .populate({
        path: 'children', // Populate the children field
        populate: {
          path: 'author', // Populate the author field within children
          model: User,
          select: '_id name parentId image', // Select only _id and username fields of the author
        },
      })

    const totalThreads = await Thread.countDocuments({
      parentId: { $in: [null, undefined] },
    })
    return {
      success: true,
      totalPages: Math.ceil(totalThreads / limit),
      data: JSON.parse(JSON.stringify(threads)),
      message: 'Threads fetched successfully',
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to fetch threads',
    }
  }
}
export async function fetchThreadById(id: string) {
  try {
    await connectDB()
    const thread = await Thread.findById(id)
      .populate('author', 'id _id name profileimage')
      .populate({
        path: 'children',
        populate: [
          {
            path: 'author',
            model: User,
            select: '_id id name parentId profileimage',
          },
          {
            path: 'children',
            model: Thread,
            populate: {
              path: 'author',
              model: User,
              select: '_id id name parentId profileimage',
            },
          },
        ],
      })

    return {
      success: true,
      data: JSON.parse(JSON.stringify(thread)),
      message: 'Thread fetched successfully',
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to fetch thread',
    }
  }
}

export async function addCommentThread({
  userid,
  comment,
  threadid,
  path,
}: {
  userid: string
  comment: string
  threadid: string
  path?: string
}) {
  try {
    await connectDB()
    const thread = await Thread.findById(threadid)
    if (!thread) {
      throw new Error('Thread not found')
    }
    const newThread = await Thread.create({
      text: comment,
      author: userid,
      parentId: threadid,
    })
    thread.children.push(newThread._id)
    await thread.save()
    return {
      success: true,
      message: 'Comment added successfully',
    }
  } catch (error: any) {
    console.error('Error adding comment:', error)
    return {
      success: false,
      message: 'Failed to add comment',
    }
  }
}
