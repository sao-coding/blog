import { cx } from "@/lib/utils"
import { IconPhoto } from "@tabler/icons-react"

const Loading = () => {
  return (
    <>
      {Array.from({ length: 2 }, (_, i) => (
        <div
          className='relative flex w-full flex-col items-center overflow-hidden rounded-xl border bg-black/25 md:h-56 md:flex-row'
          key={i}
        >
          <div
            className={cx(
              "relative h-60 w-full overflow-hidden rounded-xl backdrop-blur-xl md:h-full md:w-5/12",
              i % 2 !== 0 && "md:order-1"
            )}
          >
            <div className='flex h-full w-full items-center justify-center'>
              <IconPhoto size={80} />
            </div>
          </div>
          <div className='mb-12 flex w-full animate-pulse flex-col gap-2 p-5 md:w-7/12 md:px-10'>
            <div className='h-6 w-full rounded-full bg-black/50'></div>
            <div className='my-2 h-4 w-1/2 rounded-full bg-black/50'></div>
            <div className='h-4 w-2/3 rounded-full bg-black/50'></div>
            <div className='h-4 w-2/3 rounded-full bg-black/50'></div>
          </div>
        </div>
      ))}
    </>
  )
}

export default Loading
