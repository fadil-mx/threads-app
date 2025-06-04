import mongoose from 'mongoose'

// eslint-disable-next-line prefer-const
let isconnected = false

const connectDB = async () => {
  mongoose.set('strictQuery', true)
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is not defined in environment variables')
    return
  }
  if (isconnected) {
    console.log('MongoDB is already connected')
    return
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    isconnected = true
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    throw error
  }
}

export default connectDB
