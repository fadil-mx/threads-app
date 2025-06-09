/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'

import { revalidatePath } from 'next/cache'
import connectDB from '../db'
import User from '../db/models/userschema'
import Thread from '../db/models/Treadschema'
import { PAGE_SIZE } from '../constants'
import { FilterQuery } from 'mongoose'
import Community from '../db/models/communitySchema'

export default async function CreateOrUpdateUser({
  userId,
  username,
  name,
  profileimage,
  bio,
  pathname,
}: {
  userId: string
  username: string
  name: string
  profileimage: string
  bio?: string
  pathname: string
}) {
  try {
    await connectDB()
    await User.findOneAndUpdate(
      { id: userId },
      {
        username,
        name,
        profileimage,
        bio,
        onboarded: true,
      },
      { upsert: true }
    )
    if (pathname === '/profile/edit') {
      revalidatePath(pathname)
    }
    return {
      message: 'User created or updated successfully',
      success: true,
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error('Failed to create or update user')
  }
}

export async function fetchUserById(userId: string) {
  try {
    await connectDB()
    const user = await User.findOne({
      id: userId,
    })
    // .populate({})
    return {
      success: true,
      data: JSON.parse(JSON.stringify(user)),
      message: 'User fetched successfully',
    }
  } catch (error) {
    throw new Error('Failed to fetch user by ID')
  }
}

export async function fetchUser(userId: string) {
  try {
    await connectDB()
    const user = await User.findOne({
      id: userId,
    })
    return {
      success: true,
      data: JSON.parse(JSON.stringify(user)),
      message: 'User fetched successfully',
    }
  } catch (error) {
    throw new Error('Failed to fetch user by ID')
  }
}

export async function fetchUserPost(userId: string) {
  try {
    const user = await User.findOne({ id: userId }).populate([
      {
        path: 'communities',
        model: Community,
      },
      {
        path: 'threads',
        model: Thread,
        populate: [
          {
            path: 'author',
            model: User,
          },
          {
            path: 'children',
            model: Thread,
            populate: {
              path: 'author',
              model: User,
              select: 'name id profileimage',
            },
          },
        ],
      },
    ])
    return {
      success: true,
      data: JSON.parse(JSON.stringify(user)),
      message: 'User posts fetched successfully',
    }
  } catch (error) {
    throw new Error('Failed to fetch user posts')
  }
}

export async function SearchUser({
  userId,
  searchString = '',
  page = 1,
  limit = 12,
  sortBy = 'desc',
}: {
  userId: string
  searchString?: string
  page?: number
  limit?: number
  sortBy?: 'asc' | 'desc'
}) {
  limit = PAGE_SIZE
  const skip = (page - 1) * limit
  try {
    await connectDB()
    const query: FilterQuery<typeof User> = {
      id: { $ne: userId },
    }

    if (searchString.trim() !== '') {
      query.$or = [
        { name: { $regex: searchString, $options: 'i' } },
        { username: { $regex: searchString, $options: 'i' } },
      ]
    }

    const users = await User.find(query)
      .sort({ createdAt: sortBy })
      .skip(skip)
      .limit(limit)
    const totalUsers = await User.countDocuments(query)
    return {
      success: true,
      data: JSON.parse(JSON.stringify(users)),
      totalUsers,
      message: 'Users fetched successfully',
    }
  } catch (error) {
    throw new Error('Failed to search users')
  }
}

export async function getActivity(id: string) {
  try {
    await connectDB()
    const userThreads = await Thread.find({ author: id })
    const childrenThreads = userThreads.reduce(
      (acc, thread) => acc.concat(thread.children),
      []
    )
    const replays = await Thread.find({
      _id: { $in: childrenThreads },
      author: { $ne: id },
    }).populate({
      path: 'author',
      model: User,
      select: 'name _id profileimage id',
    })
    return {
      success: true,
      childrenThreads: JSON.parse(JSON.stringify(childrenThreads)),
      data: JSON.parse(JSON.stringify(replays)),
      message: 'Activity fetched successfully',
    }
  } catch (error) {
    throw new Error('Failed to get activity')
  }
}
