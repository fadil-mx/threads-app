'use client'
import React, { ChangeEvent, useState } from 'react'
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
import { Input } from '@/components/ui/input'
import { IuserValidation } from '@/types'
import { Uservalidation } from '@/lib/validator'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { Textarea } from '@/components/ui/textarea'
import { isBase64Image } from '@/lib/utils'
import { useUploadThing } from '@/lib/uploadthing'
import CreateOrUpdateUser from '@/lib/actions/user.action'
import { usePathname, useRouter } from 'next/navigation'

type AccountprofileProps = {
  user: {
    id: string
    objectid: string
    username: string
    name: string
    bio: string
    image: string
  }
  btnTitle?: string
}

const Accountprofile = ({ user, btnTitle }: AccountprofileProps) => {
  const [file, setfile] = useState<File[]>([])
  const { startUpload } = useUploadThing('media')
  const pathname = usePathname()
  const router = useRouter()
  const form = useForm<IuserValidation>({
    resolver: zodResolver(Uservalidation),
    defaultValues: {
      profileimage: user.image || '',
      name: user.name || '',
      username: user.username || '',
      bio: user.bio || '',
    },
  })

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    const file = e.target.files?.[0]
    if (e.target.files) {
      setfile(Array.from(e.target.files))
    }
    // console.log('file', file)
    if (!file) return

    const reader = new FileReader()

    reader.onload = () => {
      fieldChange(reader.result as string)
    }

    reader.readAsDataURL(file)
  }

  async function onSubmit(value: IuserValidation) {
    const blob = value.profileimage
    const hasimagechanged = isBase64Image(blob || '')
    if (hasimagechanged) {
      const res = await startUpload(file)
      if (res) {
        value.profileimage = res[0].url
      }
    } else {
      console.log('No file selected for upload or invalid format')
    }
    try {
      const res = await CreateOrUpdateUser({
        ...value,
        profileimage: value.profileimage ?? '',
        userId: user.id,
        pathname: pathname,
      })
      if (res.success) {
        console.log(res.message)
        if (pathname === '/profile/edit') {
          router.back()
        } else {
          router.push('/')
        }
      } else {
        console.error('Failed to update user profile:', res.message)
      }
    } catch (error) {
      console.error('Error updating user profile:', error)
    }
  }
  return (
    <div>
      {' '}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col justify-start gap-6'
        >
          <FormField
            control={form.control}
            name='profileimage'
            render={({ field }) => (
              <FormItem className='flex items-center gap-4'>
                <FormLabel className=' flex h-20 w-24 items-center justify-center rounded-full bg-dark-4 '>
                  {field.value ? (
                    <Image
                      src={field.value}
                      alt='Profile Image'
                      width={96}
                      height={96}
                      priority
                      className='rounded-full object-cover h-full w-full'
                    />
                  ) : (
                    <Image
                      src='/assets/profile.svg'
                      alt='Profile Image'
                      width={24}
                      height={24}
                      className='object-contain'
                    />
                  )}
                </FormLabel>
                <FormControl>
                  <Input
                    type='file'
                    accept='image/*'
                    placeholder='upload a photo'
                    className='  cursor-pointer border-none bg-transparent outline-none file:text-blue-500 !important'
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleImage(e, field.onChange)
                    }
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className=' '>
                <FormLabel className='text-light-2 text-base-medium'>
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    className='md:ml-2 border-none bg-dark-1 '
                    placeholder='Enter Your Name'
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-light-2 text-base-medium'>
                  Username
                </FormLabel>
                <FormControl>
                  <Input
                    className=' md:ml-2 border-none bg-dark-1 '
                    placeholder='Enter Your UserName'
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='bio'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-light-2 text-base-medium'>
                  Bio
                </FormLabel>
                <FormControl>
                  <Textarea
                    className='md:ml-2 border-none bg-dark-1 h-40 resize-none'
                    rows={10}
                    placeholder='Enter The bio'
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='bg-primary-500' type='submit'>
            {btnTitle}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default Accountprofile
