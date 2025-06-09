import React from 'react'

const SearchBar = ({ type }: { type?: string }) => {
  return (
    <div className='mb-9 w-full rounded-lg  bg-dark-2   '>
      <form action={type == 'user' ? '/search' : '/communities'} method='get'>
        <div className=' flex'>
          <input
            type='search'
            name='searchString'
            placeholder={
              type === 'user' ? 'Search for users' : 'Search for Communities'
            }
            className='w-full px-4 py-2  rounded-r-none rounded-lg  flex-1 text-light-1 placeholder:text-gray-1 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 sm:text-sm'
          />
          <button
            type='submit'
            className='rounded-lg rounded-l-none bg-primary-500 px-2 text-sm  text-light-1 hover:bg-primary-600'
          >
            Search
          </button>
        </div>
      </form>
    </div>
  )
}

export default SearchBar
