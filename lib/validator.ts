import { z } from 'zod'

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
