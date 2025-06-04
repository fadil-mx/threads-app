import { userSchema, Uservalidation } from '@/lib/validator'
import { z } from 'zod'

export type IuserValidation = z.infer<typeof Uservalidation>
export type Iuserschema = z.infer<typeof userSchema>
