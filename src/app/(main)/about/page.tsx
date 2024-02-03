const About = () => {
  return (
    <>
      <div className='relative mb-8 flex h-80 items-center justify-center before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-xl'>
        <div className='absolute flex flex-col gap-2 px-6'>
          <h1 className='text-3xl font-semibold md:text-4xl'>關於我</h1>
        </div>
      </div>
      <div className='mb-20 rounded-3xl bg-black/25 p-8'>
        <div className='flex flex-col justify-between gap-8 md:flex-row'>
          <div className='order-1 flex flex-col gap-4 md:order-none'>
            <h1 className='text-2xl font-semibold'>個人簡介：</h1>
            <p className=''>
              從小生活在電腦公司的陰影下，父親是一位電腦業界的工作者，母親則是從商的女強人。這樣的環境使我從小就接觸到豐富的電腦和資訊相關知識，埋下了我未來走向資訊科技領域的種子。在國中時，我開始對程式設計產生濃厚的興趣，最初是從寫MS-DOS命令入手。我不僅嘗試解答問答題和選擇題的批次檔，甚至還挑戰過一些讓電腦當機的批次檔。
            </p>
            <h1 className='text-2xl font-semibold'>學術歷程：</h1>
            <p>
              國中畢業後，我毅然選擇就讀松山工農資訊科，期望能夠在這個環境中更深入地發展並精進自己的程式設計能力。在高三時，我以「圖片隱寫術」一文參與了「全國小論文」比賽，並榮獲甲等獎。這次經歷不僅讓我對專題寫作有了更深刻的理解，同時也在資訊領域中找到了自己的定位，使我更加渴望在這個領域有更多的發展。
            </p>
            <h1 className='text-2xl font-semibold'>人格特質：</h1>
            <p>
              我的性格傾向於溫和，然而，面對任何事情我都能夠積極主動地處理。這種溫和的性格使我與同學相處融洽，而積極主動的態度則使我能夠高效地處理各種事務。在國小和國中時期，足球是我最熱愛的項目，每週末都在足球場上度過五、六個小時。即使在高中課業變得愈發繁忙，我仍然保持著踢足球的習慣，因為我深信保持良好的精神和體力對於學業的成功非常重要。
            </p>
            <h1 className='text-2xl font-semibold'>結語：</h1>
            <p>
              這是一段充滿資訊之路初心的旅程，我希望能夠以我的溫和與積極，以及對資訊科技的熱忱，為未來的發展鋪平更廣大的道路。
            </p>
          </div>
          <img src='/img/avatar.jpg' alt='' className='block h-40 w-40 self-start rounded-full' />
        </div>
      </div>
    </>
  )
}

export default About
