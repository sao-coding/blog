"use client"

import React from "react"
import Link from "next/link"
import cx from "classix"
import { motion, useInView } from "framer-motion"

import { SOCIAL_LINKS } from "@/config/menu"
import { IconChevronDown } from "@tabler/icons-react"

type AnimatedTextProps = {
  text: string | string[]
  delay?: number
  el?: keyof JSX.IntrinsicElements
  className?: string
}

const defaultAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    // 往上彈跳再回到原位
    y: [10, -10, 0],
    transition: { duration: 0.6 }
  }
}

const AnimatedText = ({ text, delay = 0.1, el: Wrapper = "div", className }: AnimatedTextProps) => {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true })
  const [isDone, setIsDone] = React.useState(false)
  const textArray = Array.isArray(text) ? text : [text]

  let textList: string[][] = []

  React.useEffect(() => {
    // 顯示計時器 用 log 顯示
    if (delay) {
      const timer = setTimeout(() => {
        setIsDone(true)
      }, delay * 1000)
      return () => clearTimeout(timer)
    }
  }, [delay])

  if (Array.isArray(text)) {
    textList = textArray.map((text) => {
      const splitSpace = text.split(/(\s+)/).filter(Boolean)
      const splitEmoji = splitSpace
        .map((word) => {
          if (word.match(/([^\p{Emoji}\p{White_Space}]+)/gu)) {
            return word.split(/([^\p{Emoji}\p{White_Space}]+)/gu).filter(Boolean)
          } else {
            return word
          }
        })
        .flat()
      const splitText = splitEmoji
        .map((word) => {
          if (word.match(/([^\p{Emoji}\p{White_Space}]+)/gu)) {
            return word.split("")
          } else {
            if (word.match(/^\s+$/)) return word
            word = word.replace(/(\p{Emoji})/gu, " $1 ")
            return word.split(" ").filter(Boolean)
          }
        })
        .flat()
      return splitText
    })
  } else {
    const splitSpace = text.split(/(\s+)/).filter(Boolean)
    const splitEmoji = splitSpace
      .map((word) => {
        if (word.match(/([^\p{Emoji}\p{White_Space}]+)/gu)) {
          return word.split(/([^\p{Emoji}\p{White_Space}]+)/gu).filter(Boolean)
        } else {
          return word
        }
      })
      .flat()
    const splitText = splitEmoji
      .map((word) => {
        if (word.match(/([^\p{Emoji}\p{White_Space}]+)/gu)) {
          return word.split("")
        } else {
          if (word.match(/^\s+$/)) return word
          word = word.replace(/(\p{Emoji})/gu, " $1 ")
          return word.split(" ").filter(Boolean)
        }
      })
      .flat()
    console.log("splitText", splitText)
    textList = [splitText]
  }

  return (
    <Wrapper className={className}>
      <motion.div
        ref={ref}
        // initial='hidden'
        // animate={isInView ? "visible" : "hidden"}
        // transition={{ staggerChildren: 0.1 }}
        // 改成等 delay 秒後再開始動畫
        // initial='hidden'
        // animate={isInView ? "visible" : "hidden"}
        initial='hidden'
        // 計時 delay 秒後 visible
        // animate={isInView || isDone.current ? "visible" : "hidden"}
        animate={isDone ? "visible" : "hidden"}
        transition={{ delay: delay, staggerChildren: 0.1 }}
        className='group relative leading-loose'
      >
        {textList.map((line, i) => (
          <span className='block [&_*]:inline-block' key={i}>
            {line.map((char, j) => {
              if (char.match(/^\s+$/)) {
                return <span key={j}>&nbsp;</span>
              }
              return (
                <motion.span key={j} variants={defaultAnimation} className='text-3xl'>
                  {char}
                </motion.span>
              )
            })}
          </span>
        ))}
      </motion.div>
    </Wrapper>
  )
}

const HomePage = () => {
  return (
    <div>
      {/* <div className='relative flex h-screen w-full items-center justify-center'></div> */}
      <div className='relative flex h-screen w-full flex-col items-center justify-around px-4 md:flex-row md:justify-center md:px-0'>
        <div className='flex w-full flex-col items-center justify-center md:w-1/2'>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-wrap'>
              <AnimatedText
                text={["嗨，我是唯一👋。", "一個正在學習的"]}
                className='text-4xl font-black'
              />

              <AnimatedText text={"<學生 />"} delay={1.5} el='code' className='self-end text-3xl' />
              <span className='relative -bottom-2 inline-block h-8 w-[1px] bg-gray-800/80 opacity-0 transition-opacity duration-200 group-hover:animate-blink group-hover:opacity-100 dark:bg-gray-200/80'></span>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [20, -10, 0] }}
              transition={{ delay: 2 }}
              className=''
            >
              喜歡寫程式、看動漫😆
            </motion.div>
            <div className='mt-10 flex items-center gap-2'>
              {SOCIAL_LINKS.map((social, index) => (
                <motion.div
                  key={social.link}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: [20, -10, 0] }}
                  transition={{ delay: 2 + index * 0.2 }}
                >
                  <Link href={social.link}>
                    <social.icon
                      className={cx("h-8 w-8 rounded-full stroke-2 p-1", social.color)}
                      // size={}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        <div className='flex w-1/2 justify-center'>
          <img className='rounded-full md:h-72 md:w-72' src='/img/avatar.jpg' alt='' />
        </div>
        <IconChevronDown className='absolute bottom-0 h-12 w-full animate-bounce stroke-2' />
      </div>
    </div>
  )
}

export default HomePage
