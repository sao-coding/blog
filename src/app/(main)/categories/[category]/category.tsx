"use client"

import PostCard from "@/app/(main)/blog/post-card"
import { PostCard as PostCardType } from "@/types"
import { useQuery } from "@tanstack/react-query"

const Category = ({ category }: { category: string }) => {
  const { isLoading, data: post } = useQuery<PostCardType[]>({
    queryKey: ["category", category],
    queryFn: async () => {
      const res = await fetch(`/api/post?type=all&page=0&category=${category}`)
      const json = await res.json()
      // error
      if (!res.ok) throw new Error("沒有這篇公告")
      return json
    }
  })
  return (
    <div className='flex w-full flex-col gap-4'>
      {isLoading ? (
        <div>載入中...</div>
      ) : (
        <>{post && post.map((item, i) => <PostCard key={item.id} post={item} index={i} />)}</>
      )}
    </div>
  )
}

export default Category
