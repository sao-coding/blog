import { Icon, IconCategory, IconHome, IconSignature, IconUser } from "@tabler/icons-react"

type NavLinks = {
  icon: Icon
  href: string
  text: string
}[]

export const NAV_LINKS: NavLinks = [
  {
    icon: IconHome,
    href: "/",
    text: "首頁"
  },
  {
    icon: IconSignature,
    href: "/blog",
    text: "部落格"
  },
  {
    icon: IconCategory,
    href: "/categories",
    text: "分類"
  },
  {
    icon: IconUser,
    href: "/about",
    text: "關於"
  }
]
