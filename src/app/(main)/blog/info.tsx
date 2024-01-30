"use client"

import Link from "next/link"

import { IconBrandGithub, IconBrandInstagram, IconBrandYoutube } from "@tabler/icons-react"
import { useQuery } from "@tanstack/react-query"

const Info = () => {
  const { data: postTotal } = useQuery({
    queryKey: ["postTotal"],
    queryFn: async () => {
      const res = await fetch("/api/post?type=total", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await res.json()
      return data
    }
  })

  const { data: tagTotal } = useQuery({
    queryKey: ["tagTotal"],
    queryFn: async () => {
      const res = await fetch("/api/tag?type=total", {
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
  //     const res = await fetch("/api/category?type=total", {
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
    <div className='flex flex-col items-center gap-2 rounded-3xl border bg-black/25 px-8 py-4'>
      <img src='/img/avatar.jpg' alt='作者' className='h-24 w-24 rounded-full' />
      <span className='py-1 text-xl'>ǼǾՖ唯一ی</span>
      <span className='text-sm'>消耗腦力中...</span>
      <div className='flex w-full justify-center gap-2 text-center font-semibold'>
        <div className='w-full rounded-xl bg-black/25 p-2'>
          <div>文章</div>
          <div>{postTotal?.total}</div>
        </div>
        <div className='w-full rounded-xl bg-black/25 p-2'>
          <div>標籤</div>
          <div>{tagTotal?.total}</div>
        </div>
        <div className='w-full rounded-xl bg-black/25 p-2'>
          <div>分類</div>
          <div>{tagTotal?.total}</div>
        </div>
      </div>
      <Link
        href='https://www.youtube.com/@sao-coding'
        target='_blank'
        rel='noopener noreferrer'
        className='flex w-full items-center justify-center gap-1 rounded-full bg-black/25 py-1'
      >
        <IconBrandYoutube size={20} />
        <span>訂閲我( •̀ ω •́ )✧</span>
      </Link>
      <div className='flex w-full justify-center gap-2 py-1'>
        <Link href='https://github.com/sao-coding' target='_blank' rel='noopener noreferrer'>
          <IconBrandGithub />
        </Link>
        <Link
          href='https://www.instagram.com/_xox._.xox._.xox._.xox._.xox_'
          target='_blank'
          rel='noopener noreferrer'
        >
          <IconBrandInstagram />
        </Link>
      </div>
    </div>
  )
}

export default Info
