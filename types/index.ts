import {
  commentValidator,
  threadSchema,
  threadValidator,
  userSchema,
  Uservalidation,
} from '@/lib/validator'
import { z } from 'zod'

export type IuserValidation = z.infer<typeof Uservalidation>
export type Iuserschema = z.infer<typeof userSchema>
export type IthreadValidator = z.infer<typeof threadValidator>
export type IcommentValidator = z.infer<typeof commentValidator>
export type IthreadSchema = z.infer<typeof threadSchema>
