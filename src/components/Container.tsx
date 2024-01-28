type ContainerProps = {
  children: React.ReactNode
}

const Container = (props: ContainerProps) => {
  return <main className='mx-auto w-full max-w-6xl md:px-4 md:py-20'>{props.children}</main>
}

export default Container
