"use client"

import { IconChevronDown } from "@tabler/icons-react"

const HomePage = () => {
  return (
    <div>
      <div className='relative flex h-screen w-full items-center justify-center'>
        <div className='w-1/2'>test</div>
        <div className='flex w-1/2 justify-center'>
          <img className='h-72 w-72 rounded-full' src='/img/avatar.jpg' alt='' />
        </div>
        <IconChevronDown className='absolute bottom-0 h-12 w-full animate-bounce stroke-2' />
      </div>
    </div>
  )
}

export default HomePage
