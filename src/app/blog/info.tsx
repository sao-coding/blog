"use client"

import { useQuery } from "@tanstack/react-query"

const Info = () => {
  const { data: postCount } = useQuery({
    queryKey: ["postCount"],
    queryFn: async () => {
      const res = await fetch("/api/post?type=count", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await res.json()
      return data
    }
  })

  const { data: tagCount } = useQuery({
    queryKey: ["tagCount"],
    queryFn: async () => {
      const res = await fetch("/api/tag?type=count", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await res.json()
      return data
    }
  })

  // const { data: category } = useQuery({
  //   queryKey: ["category"],
  //   queryFn: async () => {
  //     const res = await fetch("/api/category?type=count", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json"
  //       }
  //     })
  //     const data = await res.json()
  //     return data
  //   }
  // })

  return (
    <div className='flex flex-col items-center gap-2 rounded-xl border bg-black/25 p-4'>
      <img src='/img/avatar.jpg' alt='作者' className='h-24 w-24 rounded-full' />
      <span className='py-1 text-xl'>ǼǾՖ唯一ی</span>
      <span className='text-sm'>消耗腦力中...</span>
      <div className='flex w-full justify-center gap-2 text-center font-semibold'>
        <div className='rounded-xl bg-slate-500 p-2'>
          <div>文章</div>
          <div>{postCount?.count}</div>
        </div>
        <div className='rounded-xl bg-slate-500 p-2'>
          <div>標籤</div>
          <div>{tagCount?.count}</div>
        </div>
        <div className='rounded-xl bg-slate-500 p-2'>
          <div>分類</div>
          <div>{tagCount?.count}</div>
        </div>
      </div>
    </div>
  )
}

export default Info
