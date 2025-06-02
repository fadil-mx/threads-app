import React from 'react'

const RightSidebar = () => {
  return (
    <div className=' sticky right-0 top-0 z-20 flex h-screen w-fit flex-col justify-between overflow-auto border-r border-r-dark-4 bg-dark-2 pb-5 pt-24  max-sm:hidden '>
      <div className='flex flex-1 flex-col justify-start '>
        <h3 className='text-light-1 text-heading4-medium px-6 '>
          Suggested Communities
        </h3>
      </div>
    </div>
  )
}

export default RightSidebar
