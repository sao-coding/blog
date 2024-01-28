"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"

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
  const [queryClient] = useState(() => new QueryClient())
  const pathname = usePathname()

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
