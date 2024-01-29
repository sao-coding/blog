"use client"

import React from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { PostCard as PostCardType } from "@/types"
import { useQuery } from "@tanstack/react-query"

import PostCard from "./post-card"

const Content = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentPage = searchParams.get("page") || 1

  const { isLoading, data: post } = useQuery<PostCardType[]>({
    queryKey: ["post", currentPage],
    queryFn: async () => {
      const res = await fetch(`/api/post?type=all&page=${currentPage}`)
      const data = await res.json()
      return data
    }
  })

  const { data: pageCount } = useQuery({
    queryKey: ["pageCount"],
    queryFn: async () => {
      const res = await fetch(`/api/post?type=count`)
      const data = await res.json()
      return data
    }
  })

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className='flex w-full flex-col gap-4 md:w-3/4'>
          {/* <div className='relative h-screen md:-mt-20'>
              <IconChevronDown className='absolute bottom-0 h-12 w-full animate-bounce stroke-2' />
            </div> */}
          {post?.map((post, index) => <PostCard key={post.id} post={post} index={index} />)}
          {/* 分頁 等於總頁數 /2 */}

          <div className='flex justify-center gap-2'>
            {Array.from({ length: pageCount?.count / 2 }, (_, i) => (
              <button
                key={i}
                className='rounded-md border px-2 py-0.5'
                onClick={() => {
                  router.push(`/blog?page=${i + 1}`)
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Content
