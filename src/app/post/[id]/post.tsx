"use client"

// import toast from "react-hot-toast"
import React from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { NotionRenderer } from "react-notion-x"

import useScrollspy from "@/hooks/use-scrollspy"
import { cx } from "@/lib/utils"
import { Post } from "@/types"
import { IconAlignRight, IconList } from "@tabler/icons-react"
import { useQuery } from "@tanstack/react-query"

import "react-notion-x/src/styles.css"
// used for code syntax highlighting (optional)
import "prismjs/themes/prism-tomorrow.css"
// used for rendering equations (optional)
import "katex/dist/katex.min.css"

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then(async (m) => {
    // additional prism syntaxes
    await Promise.all([
      import("prismjs/components/prism-markup-templating.js"),
      import("prismjs/components/prism-markup.js"),
      import("prismjs/components/prism-bash.js"),
      import("prismjs/components/prism-java.js"),
      import("prismjs/components/prism-js-templates.js"),
      import("prismjs/components/prism-diff.js"),
      import("prismjs/components/prism-git.js"),
      import("prismjs/components/prism-go.js"),
      import("prismjs/components/prism-markdown.js"),
      import("prismjs/components/prism-python.js"),
      import("prismjs/components/prism-reason.js"),
      import("prismjs/components/prism-sql.js"),
      import("prismjs/components/prism-stylus.js"),
      import("prismjs/components/prism-yaml.js")
    ])
    return m.Code
  })
)
const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then((m) => m.Collection)
)
const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then((m) => m.Equation)
)
const Modal = dynamic(
  () =>
    import("react-notion-x/build/third-party/modal").then((m) => {
      m.Modal.setAppElement(".notion-viewport")
      return m.Modal
    }),
  {
    ssr: false
  }
)

const Post = ({ params }: { params: { id: string } }) => {
  const id = params.id
  const router = useRouter()
  const path = usePathname()
  const [tocActive, setTocActive] = React.useState(false)

  const {
    isLoading,
    isError,
    data: post
  } = useQuery<Post>({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await fetch(`/api/post?type=one&id=${id}`)
      const json = await res.json()
      // error
      if (!res.ok) throw new Error("沒有這篇公告")
      return json
    }
  })

  const activeId = useScrollspy(post?.toc?.map((item) => item.id.replace(/-/g, "")) || [], {
    rootMargin: "0% 0% -85% 0%"
  })

  //   "toc": [
  //     {
  //         "id": "26f57af2-2ec4-4cb4-a7fc-18f2ddcacdc1",
  //         "type": "header",
  //         "text": "題目",
  //         "indentLevel": 0
  //     },
  //     {
  //         "id": "350a743b-d6be-4824-8a1c-be4ec9a53489",
  //         "type": "sub_header",
  //         "text": "H2",
  //         "indentLevel": 1
  //     },
  //     {
  //         "id": "5f8a3b88-cb9d-4bcb-a1a3-6eb23aed16a3",
  //         "type": "header",
  //         "text": "解答",
  //         "indentLevel": 0
  //     },
  //     {
  //         "id": "f7a06446-f44d-4a54-b4a9-9eb722996115",
  //         "type": "sub_header",
  //         "text": "H2",
  //         "indentLevel": 1
  //     },
  //     {
  //         "id": "c9e076bd-f305-4011-8065-c5db2fb54f5e",
  //         "type": "header",
  //         "text": "標題3",
  //         "indentLevel": 0
  //     },
  //     {
  //         "id": "6e72cfe3-f448-464f-bbac-314c32c72f86",
  //         "type": "header",
  //         "text": "標題4",
  //         "indentLevel": 0
  //     },
  //     {
  //         "id": "cdbaed99-b75a-48f9-8d19-abe0359289f5",
  //         "type": "header",
  //         "text": "標題5",
  //         "indentLevel": 0
  //     }
  // ],

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className='flex w-full flex-col gap-4 p-2 md:flex-row md:p-0'>
            {post && (
              <>
                <NotionRenderer
                  className='w-full rounded-xl border !bg-black/25 p-4 md:w-3/4'
                  recordMap={post.content}
                  fullPage={true}
                  darkMode={true}
                  // showTableOfContents={true}
                  // minTableOfContentsItems={3}
                  // pageAside={
                  //   <div className=''>
                  //     <div className=''>
                  //       <button className='' onClick={() => router.push("/post")}>
                  //         返回
                  //       </button>
                  //     </div>
                  //   </div>
                  // }
                  components={{
                    Code,
                    Collection,
                    Equation,
                    Modal
                    // Pdf
                  }}
                />

                <div className='w-full md:w-1/4'>
                  {post.toc.length > 0 && (
                    // <div className='fixed left-0 top-20 hidden flex-col gap-1 rounded-xl bg-black/25 p-2 md:sticky md:flex'>
                    <div
                      className={cx(
                        "fixed bottom-4 left-4 hidden flex-col gap-1 rounded-xl border bg-black/25 p-2 backdrop-blur-md md:sticky md:left-0 md:top-20 md:flex md:backdrop-blur-0",
                        tocActive ? "flex" : "hidden"
                      )}
                    >
                      <div className='flex items-center p-2 text-lg font-semibold'>
                        <IconAlignRight />
                        <Link href={`#${post.toc[0].id.replace(/-/g, "")}`}>目錄</Link>
                      </div>
                      {post.toc.map((item) => (
                        // 判斷 indentLevel 來決定縮排
                        <div
                          key={item.id}
                          // 動畫過度
                          className={cx(
                            "rounded-md px-2 transition-all duration-300",
                            activeId === item.id.replace(/-/g, "") && "bg-black/50"
                          )}
                        >
                          {item.indentLevel === 0 && (
                            <div className=''>
                              <Link href={`#${item.id.replace(/-/g, "")}`}>{item.text}</Link>
                            </div>
                          )}

                          {item.indentLevel === 1 && (
                            <div className='pl-4'>
                              <Link href={`#${item.id.replace(/-/g, "")}`}>{item.text}</Link>
                            </div>
                          )}

                          {item.indentLevel === 2 && (
                            <div className='pl-8'>
                              <Link href={`#${item.id.replace(/-/g, "")}`}>{item.text}</Link>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          <div
            className='fixed bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black md:hidden'
            onClick={() => setTocActive(!tocActive)}
          >
            <IconList />
          </div>
        </>
      )}
    </>
  )
}

export default Post
