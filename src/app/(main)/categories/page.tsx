import Categories from "./categories"

const CategoriesPage = () => {
  return (
    <>
      <div className='relative mb-8 flex h-80 items-center justify-center before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-xl'>
        <div className='absolute flex flex-col gap-2 px-6'>
          <h1 className='text-3xl font-semibold md:text-4xl'>分類</h1>
        </div>
      </div>
      <div className=''>
        <Categories />
      </div>
    </>
  )
}

export default CategoriesPage
