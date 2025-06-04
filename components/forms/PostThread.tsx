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
import { IthreadValidator } from '@/types'
import { threadValidator } from '@/lib/validator'
import { useForm } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import { createThread } from '@/lib/actions/thread.action'
import { usePathname, useRouter } from 'next/navigation'

type Props = {
  userId: string
}

const PostThread = ({ userId }: Props) => {
  const pathname = usePathname()
  const router = useRouter()
  const form = useForm<IthreadValidator>({
    resolver: zodResolver(threadValidator),
    defaultValues: {
      thread: '',
      accountId: userId,
    },
  })

  const onSubmit = async (value: IthreadValidator) => {
    console.log('value', value)
    const res = await createThread({
      text: value.thread,
      author: userId,
      community: null,
      path: pathname,
    })
    if (!res.success) {
      console.log(res.message)
    }
    router.push('/')
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col justify-start gap-6 mt-10'
        >
          <FormField
            control={form.control}
            name='thread'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-light-2 text-base-medium'>
                  Content
                </FormLabel>
                <FormControl className='no-focus mt-2  border border-dark-4 bg-dark-3 text-light-1 '>
                  <Textarea
                    className='  h-40'
                    rows={15}
                    placeholder='Enter The bio'
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='bg-primary-500' type='submit'>
            Post Thread
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default PostThread
