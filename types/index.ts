import { Uservalidation } from '@/lib/validator'
import { z } from 'zod'

export type IuserValidation = z.infer<typeof Uservalidation>
