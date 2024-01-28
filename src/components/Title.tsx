import Close from "@/components/Close"
import { Title as TitleType } from "@/types"

const Title = ({ title }: { title: TitleType }) => {
  return (
    <>
      <div
        className={`relative my-0.5 w-full py-2 text-2xl font-bold md:mb-2 md:rounded-xl md:border md:py-1 md:shadow-sm ${title.position}`}
      >
        <>{title.close && <Close />}</>
        {title.title}
      </div>
    </>
  )
}

export default Title
