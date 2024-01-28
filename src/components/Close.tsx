"use client"

import { useRouter } from "next/navigation"

import { IconArrowLeft } from "@tabler/icons-react"

const Close = () => {
  const router = useRouter()
  const handleBack = () => {
    if (window.history.length < 2) {
      router.push("/")
    } else {
      router.back()
    }
  }

  return (
    <div
      className='absolute left-0 top-0 flex h-full items-center pl-2 md:hidden'
      onClick={handleBack}
    >
      <IconArrowLeft size={26} />
    </div>
  )
}

export default Close
