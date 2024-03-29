import type { Metadata } from "next"
import Script from "next/script"

import Footer from "@/components/Footer"
import Header from "@/components/Header"

import Providers from "./providers"

import "./globals.css"

// const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "唯一のBlog",
  description: "建構於 Next.js + Tailwind CSS + Vercel"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='zh-Hant-TW' className='scroll-smooth'>
      <body>
        <Providers>
          <div className="fixed z-[-999] h-full w-full bg-[url('/img/index.webp')] bg-cover bg-center bg-no-repeat before:absolute before:inset-0 before:bg-black/50" />
          <Header />
          {children}
          <canvas
            id='universe'
            className='pointer-events-none fixed left-0 top-0 z-[1] m-0 block h-full w-full border-0 p-0 outline-0'
          />
          <Footer />
          <Script src='/js/universe.js' async defer strategy='afterInteractive' />
        </Providers>
      </body>
    </html>
  )
}
