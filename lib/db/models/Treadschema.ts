import { IthreadSchema } from '@/types'
import { Schema, model, models, Document } from 'mongoose'

interface IThread extends Document, IthreadSchema {
  _id: string
  createdAt: Date
  updatedAt: Date
}

const threadschema = new Schema<IThread>(
  {
    text: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    community: {
      type: Schema.Types.ObjectId,
      ref: 'Community',
    },
    parentId: {
      type: String,
    },
    children: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thread',
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Thread = models.Thread || model<IThread>('Thread', threadschema)
export default Thread
