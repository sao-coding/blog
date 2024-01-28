import React from "react"

const useScrollspy = (ids: string[], options: IntersectionObserverInit): string | undefined => {
  const [activeId, setActiveId] = React.useState<string>()
  const observer = React.useRef<IntersectionObserver>()

  React.useEffect(() => {
    const elements = ids.map((id) => document.querySelector(`#${CSS.escape(id)}`))

    if (observer.current) {
      observer.current?.disconnect()
    }

    observer.current = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry?.isIntersecting) {
          console.log("進入", entry.target.id)
          setActiveId(entry.target.id)
        }
      }
    }, options)

    for (const el of elements) {
      el && observer.current?.observe(el)
    }

    return () => observer.current?.disconnect()
  }, [ids, options])

  return activeId
}

export default useScrollspy
