import {
  Icon,
  IconCategory,
  IconHome,
  IconSignature,
  IconTags,
  IconUser
} from "@tabler/icons-react"

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
    icon: IconTags,
    href: "/tags",
    text: "標籤"
  },
  {
    icon: IconUser,
    href: "/about",
    text: "關於"
  }
]
