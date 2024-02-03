"use client"

import React from "react"
import { usePathname } from "next/navigation"

import { usePageLoadStore } from "@/store/page-load"
// import { Session } from "next-auth"
// import { ThemeProvider } from "next-themes"
// import getIP from "@/utils/ip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const Providers = ({
  children
  // session
}: {
  children: React.ReactNode
  // session: Session | null
}) => {
  const [queryClient] = React.useState(() => new QueryClient())
  const pathname = usePathname()
  const { pageLoad, setPageLoad } = usePageLoadStore()

  // 獲取 localStorage scroll 位置 並設定

  React.useEffect(() => {
    const scroll = localStorage.getItem("scroll")
    // console.log("獲取 scroll", scroll)
    // if (scroll && pageLoad) {
    //   console.log("設定 scroll", scroll)
    //   window.scrollTo(0, parseInt(scroll))
    // }
    if (scroll) {
      console.log("設定 scroll", scroll)
      window.scrollTo(0, parseInt(scroll))
    }
  }, [])

  // 獲取 scroll 位置 並存入 localStorage

  React.useEffect(() => {
    const handleScroll = () => {
      // 判斷 頁面載入完成
      // if (!pageLoad) return
      localStorage.setItem("scroll", window.scrollY.toString())
      console.log("儲存 scroll", window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // useEffect(() => {
  //   const writeLog = async () => {
  //     await fetch("/api/log", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         ip: await getIP(),
  //         stuID: session?.user.studentID,
  //         name: session?.user.name,
  //         path: pathname
  //       })
  //     })
  //   }
  //   if (session?.user.name) {
  //     writeLog()
  //   }
  // }, [pathname])

  return (
    // <ThemeProvider attribute='class' disableTransitionOnChange>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    // </ThemeProvider>
  )
}

export default Providers
