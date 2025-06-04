/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'

import { revalidatePath } from 'next/cache'
import connectDB from '../db'
import User from '../db/models/userschema'

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
