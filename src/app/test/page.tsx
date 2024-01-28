"use client"
// core styles shared by all of react-notion-x (required)
import React from "react"
import dynamic from "next/dynamic"
import { NotionRenderer } from "react-notion-x"

const Code = dynamic(() => import("react-notion-x/build/third-party/code").then((m) => m.Code))
const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then((m) => m.Collection)
)
const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then((m) => m.Equation)
)
// const Pdf = dynamic(() => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf), {
//   ssr: false
// })
const Modal = dynamic(() => import("react-notion-x/build/third-party/modal").then((m) => m.Modal), {
  ssr: false
})
import "react-notion-x/src/styles.css"
// used for code syntax highlighting (optional)
import "prismjs/themes/prism-tomorrow.css"
// used for rendering equations (optional)
import "katex/dist/katex.min.css"

const Home = () => {
  const [data, setData] = React.useState()
  React.useEffect(() => {
    const getData = async () => {
      const res = await fetch("http://localhost:3000/api/test1")
      const data = await res.json()
      setData(data)
    }
    getData()
  }, [])

  return (
    <div>
      <h1>Home</h1>
      {data && (
        <NotionRenderer
          recordMap={data}
          fullPage={true}
          components={{
            Code,
            Collection,
            Equation,
            Modal
            // Pdf
          }}
          darkMode={false}
        />
      )}
    </div>
  )
}

export default Home
