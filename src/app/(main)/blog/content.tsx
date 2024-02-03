"use client"

import React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import cx from "classix"

import { usePageLoadStore } from "@/store/page-load"
import { PostCard as PostCardType } from "@/types"
import { useQuery } from "@tanstack/react-query"

import Loading from "./loading"
import PostCard from "./post-card"

const Content = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentPage = searchParams.get("page") || 1

  const { pageLoad, setPageLoad } = usePageLoadStore()

  const { data: post, isLoading } = useQuery<PostCardType[]>({
    queryKey: ["post", currentPage],
    queryFn: async () => {
      const res = await fetch(`/api/post?type=all&page=${currentPage}`)
      const data = await res.json()
      return data
    }
  })

  const { isLoading: isPageTotalLoading, data: pageTotal } = useQuery({
    queryKey: ["pageTotal"],
    queryFn: async () => {
      const res = await fetch(`/api/post?type=total`)
      const data = await res.json()
      return data
    }
  })

  // React.useEffect(() => {
  //   if (!isLoading && !isPageTotalLoading) {
  //     setPageLoad(true)
  //     console.log("頁面載入完成")
  //   }
  // }, [isLoading, isPageTotalLoading])

  // React.useEffect(() => {
  //   // 滾動到特定元素
  //   const handleDown = () => {
  //     if (isLoading) return
  //     // 判斷首次載入 用 window name
  //     if (window.name === "") {
  //       window.name = "loaded"
  //       return
  //     }
  //     // 若沒有 localStorage scroll 位置

  //     if (localStorage.getItem("page") === "true") {
  //       console.log("滑動到特定元素")
  //       const element = document.querySelector("#layout")
  //       console.log(element)
  //       element?.scrollIntoView({ behavior: "smooth" })
  //     }
  //     localStorage.setItem("page", false.toString())
  //   }
  //   handleDown()
  // }, [currentPage, isLoading])

  return (
    <div className='flex w-full flex-col gap-4 md:w-3/4'>
      {/* <div className='relative h-screen md:-mt-20'>
              <IconChevronDown className='absolute bottom-0 h-12 w-full animate-bounce stroke-2' />
            </div> */}
      {isLoading ? (
        <Loading />
      ) : (
        <>{post?.map((post, index) => <PostCard key={post.id} post={post} index={index} />)}</>
      )}
      {/* 分頁 等於總頁數 /2 */}

      <div className='flex justify-center gap-2'>
        {isPageTotalLoading ? (
          <>
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className={cx(
                  "rounded-md border px-2 py-0.5",
                  currentPage == i + 1 && "bg-black/80 text-white"
                )}
              >
                #
              </div>
            ))}
          </>
        ) : (
          <>
            {/* 除不盡的話 +1 */}
            {Array.from({ length: Math.ceil(pageTotal.total / 2) }, (_, i) => (
              <button
                key={i}
                className={cx(
                  "rounded-md border px-2 py-0.5",
                  currentPage == i + 1 && "bg-black/80 text-white"
                )}
                onClick={() => {
                  router.push(`/blog?page=${i + 1}`)
                  // 設定 scroll 在 #layout 元素上
                  // window.innerHeight
                  // localStorage.setItem("scroll", window.innerHeight.toString())
                  // localStorage.setItem("page", true.toString())
                }}
              >
                {i + 1}
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default Content
