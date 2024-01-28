"use client"

import { IconChevronDown } from "@tabler/icons-react"

import Aside from "./aside"
import Content from "./content"

const BlogPage = () => {
  const handleDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    })
  }

  return (
    <>
      <div className='relative h-screen md:-mt-20'>
        <IconChevronDown
          className='absolute bottom-0 h-12 w-full animate-bounce stroke-2'
          onClick={handleDown}
        />
      </div>
      <div className='flex w-full flex-col gap-4 py-5 md:flex-row md:py-20'>
        <Content />
        <Aside />
      </div>
    </>
  )
}

export default BlogPage
