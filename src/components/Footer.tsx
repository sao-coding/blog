"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { NAV_LINKS } from "@/config/menu"
import { cx } from "@/lib/utils"

const Footer = () => {
  // const [prevScrollPos, setPrevScrollPos] = useState(0)
  // const [navbarHidden, setNavbarHidden] = useState(false)
  const pathname = usePathname()

  // useEffect(() => {
  //     const handleScroll = () => {
  //         const currentScrollPos = window.scrollY

  //         if (prevScrollPos > currentScrollPos) {
  //             setNavbarHidden(false) // 往上滾動，顯示導覽列
  //         } else {
  //             setNavbarHidden(true) // 往下滾動，隱藏導覽列
  //         }

  //         setPrevScrollPos(currentScrollPos)
  //     }

  //     window.addEventListener("scroll", handleScroll, { passive: true })

  //     return () => {
  //         window.removeEventListener("scroll", handleScroll)
  //     }
  // }, [prevScrollPos])
  const click = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const btnSize = e.currentTarget.getBoundingClientRect()
    const calX = e.clientX - btnSize.x
    const calY = e.clientY - btnSize.y
    const ripple = document.createElement("span")
    ripple.className = "footer-ripple"
    ripple.style.left = calX + "px"
    ripple.style.top = calY + "px"
    e.currentTarget.append(ripple)
    setTimeout(() => ripple.remove(), 500)
  }
  return (
    <footer
      className={cx(
        "fixed bottom-3 z-10 flex h-14 w-full items-center justify-center px-4 transition-all duration-300 md:hidden"
        // { hidden: navbarHidden }
      )}
    >
      <div className='flex h-full w-full items-center justify-around rounded-2xl backdrop-blur'>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            title={link.text}
            className='footer relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl'
            onClick={(e) => click(e)}
          >
            <link.icon
              // 如果pathname 前面的路徑是link.href 且 pathname 不是首頁
              size={
                pathname.startsWith(link.href) && link.href !== "/"
                  ? 30
                  : link.href === "/" && pathname === "/"
                    ? 30
                    : 26
              }
              // 如果pathname 前面的路徑是link.href 且 pathname 不是首頁
              className={cx(
                "stroke-black/80 dark:stroke-white/80",
                pathname.startsWith(link.href) && link.href !== "/"
                  ? "fill-main-color-3 stroke-2"
                  : link.href === "/" && pathname === "/"
                    ? "fill-main-color-3 stroke-2"
                    : ""
              )}
            />
          </Link>
        ))}
      </div>
    </footer>
  )
}

export default Footer
