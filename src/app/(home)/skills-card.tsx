"use client"

import React from "react"
import { motion, useInView } from "framer-motion"

import {
  IconAndroidStudio,
  IconArduino,
  IconCodePen,
  IconCS,
  IconCSS,
  IconDjango,
  IconDocker,
  IconDotNet,
  IconFirebase,
  IconFlask,
  IconGit,
  IconGithub,
  IconHTML,
  IconJava,
  IconJavaScript,
  IconMarkdown,
  IconMySQL,
  IconNextJS,
  IconNodeJS,
  IconPHP,
  IconPlanetScale,
  IconPostman,
  IconPowershell,
  IconPrisma,
  IconPython,
  IconReactJS,
  IconTypeScript,
  IconVercel,
  IconVisualStudio,
  IconVite,
  IconVSCode
} from "@/components/icons"
import { Marquee } from "@/components/ui/marquee"
import { IconBolt } from "@tabler/icons-react"

const languageSkills = [
  IconArduino,
  IconJava,
  IconCS,
  IconPython,
  IconHTML,
  IconCSS,
  IconJavaScript,
  IconMarkdown,
  IconPHP,
  IconMySQL,
  IconTypeScript
]

const toolSkills = [
  IconAndroidStudio,
  IconCodePen,
  IconDocker,
  IconGit,
  IconGithub,
  IconPrisma,
  IconPlanetScale,
  IconPostman,
  IconPowershell,
  IconVercel,
  IconVisualStudio,
  IconFirebase,
  IconVSCode
]

// 框架
const frameworkSkills = [
  IconNextJS,
  IconReactJS,
  IconVite,
  IconNodeJS,
  IconDjango,
  IconFlask,
  IconDotNet
]

const SkillsCard = () => {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className='flex w-full flex-col gap-2 rounded-3xl bg-black/50 p-4'
    >
      <div className='flex items-center gap-2'>
        <IconBolt />
        <h2>技能</h2>
      </div>
      <Marquee className='py-4' fade pauseOnHover>
        {languageSkills.map((Icon, i) => (
          <Icon key={i} className='h-12 w-12' />
        ))}
      </Marquee>
      <Marquee className='py-4' reverse fade pauseOnHover>
        {toolSkills.map((Icon, i) => (
          <Icon key={i} className='h-12 w-12' />
        ))}
      </Marquee>
      <Marquee className='py-4' fade pauseOnHover>
        {frameworkSkills.map((Icon, i) => (
          <Icon key={i} className='h-12 w-12' />
        ))}
      </Marquee>
    </motion.div>
  )
}

export default SkillsCard
