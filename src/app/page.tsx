"use client"

import React from "react"
import { motion, useInView } from "framer-motion"

import { IconChevronDown } from "@tabler/icons-react"

type AnimatedTextProps = {
  text: string | string[]
  el?: keyof JSX.IntrinsicElements
  className?: string
}

const defaultAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0
  }
}

const AnimatedText = ({ text, el: Wrapper = "div", className = "" }: AnimatedTextProps) => {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-400px 0px -400px 0px" })
  const textArray = Array.isArray(text) ? text : [text]

  let textList: string[][] = []

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
  let code = false
  return (
    <Wrapper className={className}>
      <motion.div
        ref={ref}
        initial='hidden'
        animate={isInView ? "visible" : "hidden"}
        transition={{ staggerChildren: 0.1 }}
        className='group relative leading-loose'
      >
        {textList.map((line, i) => (
          <span className='block [&_*]:inline-block' key={i}>
            {line.map((char, j) => {
              if (char.match(/^\s+$/)) {
                if (code) {
                  return (
                    <code key={j} className='text-3xl'>
                      &nbsp;
                    </code>
                  )
                } else {
                  return <span key={j}>&nbsp;</span>
                }
              } else {
                // 如果 字元有包含 <學生 /> 其中一個字元，就套用 code 樣式
                console.log(i, j, textList.length - 1, line.length - 1)
                if (i === textList.length - 1 && j === line.length - 1) {
                  console.log("最後一個字元", char)
                  return (
                    <React.Fragment key={j}>
                      <motion.code variants={defaultAnimation} className='text-3xl'>
                        {char}
                      </motion.code>
                      <span className='relative -bottom-2 inline-block h-8 w-[1px] bg-gray-800/80 opacity-0 transition-opacity duration-200 group-hover:animate-blink group-hover:opacity-100 dark:bg-gray-200/80'></span>
                    </React.Fragment>
                  )
                }
                if (char === "<") code = true
                if ("<學生 />".includes(char) && code) {
                  console.log("包含 <學生 />", char)

                  return (
                    <motion.code key={j} variants={defaultAnimation} className='text-3xl'>
                      {char}
                    </motion.code>
                  )
                }

                return (
                  <motion.span key={j} variants={defaultAnimation}>
                    {char}
                  </motion.span>
                )
              }
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
      <div className='relative flex h-screen w-full items-center justify-center'></div>
      <div className='relative flex h-screen w-full items-center justify-center'>
        <div className='flex w-1/2 flex-col items-center justify-center'>
          <div className=''>
            {/* <div className='group relative leading-[4] [&_*]:inline-block'>
              <h1 className='text-4xl font-black'>嗨，我是唯一👋。</h1>
              <br />
              <h1 className='text-4xl font-black'>一個正在學習的</h1>
              <code className='text-3xl'>{"<學生 />"}</code>
              <span className='group-hover:animate-blink relative -bottom-2 inline-block h-8 w-[1px] bg-gray-800/80 opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:bg-gray-200/80'></span>
            </div> */}
            <AnimatedText
              text={["嗨，我是唯一👋。", "一個正在學習的 <學生 />"]}
              className='text-4xl font-black'
            />
            {/* y = 20 -> 0 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.5 }}
              className='text-2xl font-black'
            >
              text
            </motion.div>
          </div>
        </div>
        <div className='flex w-1/2 justify-center'>
          <img className='h-72 w-72 rounded-full' src='/img/avatar.jpg' alt='' />
        </div>
        <IconChevronDown className='absolute bottom-0 h-12 w-full animate-bounce stroke-2' />
      </div>
    </div>
  )
}

export default HomePage
