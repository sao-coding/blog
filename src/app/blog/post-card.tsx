import Link from "next/link"

import { cx } from "@/lib/utils"
import { PostCard } from "@/types"
import { IconCalendarMonth, IconInbox, IconTag } from "@tabler/icons-react"

const PostCard = ({ post, index }: { post: PostCard; index: number }) => {
  return (
    // 若沒有 Cover 圖片，則顯示預設圖片
    <div className='relative flex w-full flex-col items-center overflow-hidden rounded-xl border bg-black/25 md:h-56 md:flex-row'>
      <div
        className={cx(
          "relative h-60 w-full overflow-hidden rounded-xl md:h-full md:w-5/12",
          index % 2 !== 0 && "md:order-1"
        )}
      >
        <Link href={`/post/${post.id}`}>
          <img
            className={cx(
              "h-full w-full transform object-cover transition-all duration-300 hover:scale-105",
              !post.cover && "hidden"
            )}
            src={post.cover}
            alt=''
          />
        </Link>
        {/* <div className='absolute left-4 top-4 flex items-center gap-1 rounded-md bg-orange-500/40 px-1'> */}
        <div
          className={cx(
            "absolute left-4 top-4 flex items-center gap-1 rounded-md bg-orange-500/30 px-1 font-semibold backdrop-blur-xl",
            index % 2 !== 0 && "left-auto right-4"
          )}
        >
          <IconInbox size={20} />
          {post.category}
        </div>
      </div>
      <div className='mb-12 flex w-full flex-col gap-2 p-5 md:w-7/12 md:px-10'>
        <Link href={`/post/${post.id}`} className='hover:text-orange-600'>
          <h1 className='text-2xl'>{post.title}</h1>
        </Link>
        <div className='flex items-center gap-1'>
          <IconCalendarMonth />
          {new Date(post.publishTime).toLocaleString()}
        </div>

        <p>{post.summary}</p>

        <div
          className={cx(
            "absolute bottom-4 right-4 flex items-center gap-2",
            index % 2 !== 0 && "md:left-10 md:right-auto"
          )}
        >
          <IconTag size={18} className='mt-1' />
          {post.tags.map((tag) => (
            <Link href={`/tag/${tag}`} key={tag}>
              <span className='cursor-pointer rounded-md bg-slate-500 px-1 py-0.5 text-sm'>
                {tag}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PostCard
