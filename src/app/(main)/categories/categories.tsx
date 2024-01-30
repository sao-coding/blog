"use client"

import Link from "next/link"

import { SelectOptionList } from "@/types"
import { useQuery } from "@tanstack/react-query"

const Categories = () => {
  const { isLoading, data: category } = useQuery<SelectOptionList[]>({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await fetch("/api/category?type=list")
      const json = await res.json()
      // error
      if (!res.ok) throw new Error("沒有這篇公告")
      return json
    }
  })

  return (
    <div className='grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-4'>
      {isLoading ? (
        <div>載入中...</div>
      ) : (
        <>
          {category?.map((item, i) => (
            <Link
              key={item.id}
              href={`/categories/${item.value}`}
              className='flex w-full items-center justify-between rounded-3xl bg-black/50 px-6 py-3'
            >
              <div className=''>{item.value}</div>
              <div className='flex h-6 w-6 items-center justify-center rounded-full bg-slate-500'>
                {item.total}
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  )
}

export default Categories
