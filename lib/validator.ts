import { z } from 'zod'

const MongoId = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid MongoId')

export const Uservalidation = z.object({
  profileimage: z.string().url().optional(),
  name: z
    .string()
    .min(2, 'Name is required')
    .max(20, 'Name must be less than 20 characters'),
  username: z
    .string()
    .min(2, 'Username is required')
    .max(20, 'Username must be less than 20 characters'),
  bio: z.string().max(150, 'Bio must be less than 150 characters').optional(),
})

export const userSchema = Uservalidation.extend({
  id: z.string().min(1, 'ID is required'),
  threads: z
    .array(
      z.object({
        _id: MongoId,
      })
    )
    .default([]),
  onboarded: z.boolean().default(false),
  communities: z
    .array(
      z.object({
        _id: MongoId,
      })
    )
    .default([]),
})

export const threadSchema = z.object({
  text: z.string().min(1, 'Thread content is required'),
  author: MongoId.optional(),
  community: MongoId.optional(),
  parentId: z.string().optional(),
  children: z.array(MongoId).optional(),
})

export const threadValidator = z.object({
  thread: z.string().min(1, 'Thread content is required'),
  accountId: MongoId,
})

export const commentValidator = z.object({
  comment: z.string().min(1, 'Comment content is required'),
})
