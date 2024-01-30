// 獲取圖片網址
const getPageCover = (url: any, id: string) => {
  // let url = collectionData.recordMap.block[id].value.format?.page_cover
  if (!url) {
    return null
  }

  if (url.startsWith("data:")) {
    return url
  }

  // more recent versions of notion don't proxy unsplash images
  if (url.startsWith("https://images.unsplash.com")) {
    return url
  }

  try {
    const u = new URL(url)

    if (
      u.pathname.startsWith("/secure.notion-static.com") &&
      u.hostname.endsWith(".amazonaws.com")
    ) {
      if (
        u.searchParams.has("X-Amz-Credential") &&
        u.searchParams.has("X-Amz-Signature") &&
        u.searchParams.has("X-Amz-Algorithm")
      ) {
        // if the URL is already signed, then use it as-is
        return url
      }
    }
  } catch {
    // ignore invalid urls
  }

  if (url.startsWith("/images")) {
    url = `https://www.notion.so${url}`
  }

  url = `https://www.notion.so${
    url.startsWith("/image") ? url : `/image/${encodeURIComponent(url)}`
  }`

  const notionImageUrlV2 = new URL(url)

  notionImageUrlV2.searchParams.set("table", "block")
  notionImageUrlV2.searchParams.set("id", id)
  notionImageUrlV2.searchParams.set("cache", "v2")

  url = notionImageUrlV2.toString()

  return url
}

export default getPageCover
