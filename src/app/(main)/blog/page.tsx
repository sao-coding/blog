"use client"

import { Suspense } from "react"

// import { IconChevronDown } from "@tabler/icons-react"
import Aside from "./aside"
import Content from "./content"

const BlogPage = () => {
  // 滾動到特定元素
  // const handleDown = () => {
  //   const element = document.querySelector("#layout")
  //   element?.scrollIntoView({ behavior: "smooth" })
  // }

  return (
    <>
      {/* <div className='relative h-screen md:-mt-20'>
        <IconChevronDown
          className='absolute bottom-0 h-12 w-full animate-bounce stroke-2'
          onClick={handleDown}
        />
      </div> */}
      <div id='layout' className='mb-20 flex w-full flex-col gap-4 py-5 md:flex-row md:py-20'>
        <Suspense>
          <Content />
        </Suspense>
        <Aside />
      </div>
    </>
  )
}

export default BlogPage
