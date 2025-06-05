'use client'
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { IcommentValidator } from '@/types'
import { commentValidator } from '@/lib/validator'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Input } from '../ui/input'
import Image from 'next/image'
import { addCommentThread } from '@/lib/actions/thread.action'

type CommentProps = {
  id?: string
  currentUserimage?: string
  currentUserId?: string
}

const Comment = ({ id, currentUserimage, currentUserId }: CommentProps) => {
  const router = useRouter()
  const form = useForm<IcommentValidator>({
    resolver: zodResolver(commentValidator),
    defaultValues: {
      comment: '',
    },
  })

  const onSubmit = async (value: IcommentValidator) => {
    try {
      const res = await addCommentThread({
        userid: currentUserId || '',
        comment: value.comment,
        threadid: id || '',
      })
      if (!res.success) {
        console.error('Failed to add comment:', res.message)
        return
      }
      router.refresh()
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }

  return (
    <div className=''>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=' flex gap-4 items-center   border-y border-y-dark-4 py-5 '
        >
          <FormField
            control={form.control}
            name='comment'
            render={({ field }) => (
              <FormItem className='flex  flex-1'>
                <FormLabel className='text-light-2 text-base-medium relative md:mt-2  h-9 w-9  '>
                  <Image
                    src={currentUserimage || ''}
                    alt='user_image'
                    fill
                    className='rounded-full  object-cover'
                  />
                </FormLabel>
                <FormControl className='no-focus mt-2  text-light-1 '>
                  <Input
                    className=' bg-transparent border-none no-focus  '
                    placeholder='Comment...'
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='bg-primary-500' type='submit'>
            Replay
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default Comment
