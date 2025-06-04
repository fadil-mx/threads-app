import { Iuserschema } from '@/types'
import mongoose from 'mongoose'

export interface UserSchema extends mongoose.Document, Iuserschema {
  _id: mongoose.Types.ObjectId
  id: string
  createdAt: Date
  updatedAt: Date
}

const userSchema = new mongoose.Schema<UserSchema>(
  {
    id: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    profileimage: { type: String, default: '' },
    bio: { type: String, default: '' },
    threads: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Thread',
        },
      ],
      default: [],
    },
    onboarded: { type: Boolean, default: false },
    communities: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Community',
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
)

const User =
  mongoose.models.User || mongoose.model<UserSchema>('User', userSchema)

export default User
