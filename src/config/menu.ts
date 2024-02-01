import { IconBrandLine, IconBrandThreads, IconBrandX } from "@tabler/icons-react"
import {
  Icon,
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
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

// 社交link

type SocialLinks = {
  icon: Icon
  link: string
  color: string
}[]

export const SOCIAL_LINKS: SocialLinks = [
  {
    icon: IconBrandGithub,
    link: "https://github.com/sao-coding",
    color: "bg-gray-900"
  },
  {
    icon: IconBrandFacebook,
    link: "https://www.facebook.com/Black.HANK.X",
    color: "bg-blue-700"
  },
  {
    icon: IconBrandLine,
    link: "https://line.me/ti/p/t7Fr6CQFLi",
    color: "bg-green-700"
  },
  {
    icon: IconBrandInstagram,
    link: "https://www.instagram.com/_xox._.xox._.xox._.xox._.xox_",
    color: "bg-pink-700"
  },
  {
    icon: IconBrandThreads,
    link: "https://www.threads.net/@_xox._.xox._.xox._.xox._.xox_",
    color: "bg-black"
  },
  {
    icon: IconBrandX,
    link: "https://twitter.com/sao_coding",
    color: "bg-gray-800"
  }
]
