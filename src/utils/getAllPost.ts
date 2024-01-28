import { NotionAPI } from "notion-client"
import {
  AggregationResult,
  BlockMap,
  CollectionMap,
  CollectionViewMap,
  CollectionViewType,
  ID,
  UserMap
} from "notion-types"

import site from "@/config/site"

// "result": {
//     "type": "reducer",
//     "reducerResults": {
//         "collection_group_results": {
//             "type": "results",
//             "blockIds": [
// collectionData.result.reducerResults

type CollectionInstance = {
  recordMap: RecordMap
  result: CollectionQueryResult
}

type RecordMap = {
  block: BlockMap
  collection: CollectionMap
  collection_view?: CollectionViewMap
  notion_user?: UserMap
}

type CollectionQueryResult = {
  type: CollectionViewType
  total: number
  blockIds: ID[]
  aggregationResults: Array<AggregationResult>
  groupResults?: Array<{
    value: AggregationResult
    blockIds: ID[]
    total: number
    aggregationResult: AggregationResult
  }>
  collection_group_results?: {
    type: string
    blockIds: ID[]
    hasMore: boolean
  }
  reducerResults: {
    collection_group_results: {
      type: string
      blockIds: ID[]
      hasMore: boolean
    }
  }
}

const getAllPost = async (type: string, page?: number) => {
  const api = new NotionAPI()

  //   export interface CollectionInstance {
  //     recordMap: RecordMap;
  //     result: CollectionQueryResult;
  // }

  // 03afd5b6-6641-4fd3-869d-b246ed4ffba9?v=fb5085bc-6092-4089-a4f8-bbe698064172

  const limit = 2

  const collectionData = (await api.getCollectionData(
    site.NOTION_PAGE_ID,
    "fb5085bc-6092-4089-a4f8-bbe698064172",
    "文章"
  )) as unknown as CollectionInstance

  // 所有文章的 ID desc
  let AllPosts = collectionData.result.reducerResults.collection_group_results.blockIds.reverse()
  // AllPosts.reverse()
  console.log({ AllPosts })
  if (type === "all") {
    // 輸出目前頁數的文章
    if (page) {
      AllPosts = AllPosts.slice((page - 1) * limit, page * limit)
    }

    // 獲取全部欄位
    const AllPostsProperties = Object.entries(collectionData.recordMap.collection)[0][1].value
      .schema

    // 獲取概述 ID
    let SummaryID = ""
    Object.entries(AllPostsProperties).forEach(([key, value]) => {
      if (value.name === "概述") {
        SummaryID = key
      }
    })

    // console.log({ SummaryID })

    // 獲取分類 ID
    let CategoryID = ""
    Object.entries(AllPostsProperties).forEach(([key, value]) => {
      if (value.name === "分類") {
        CategoryID = key
      }
    })

    // console.log({ CategoryID })

    // 獲取標籤 ID
    let TagsID = ""
    Object.entries(AllPostsProperties).forEach(([key, value]) => {
      if (value.name === "標籤") {
        TagsID = key
      }
    })

    // console.log({ TagsID })

    // 獲取狀態 ID
    let StatusID = ""
    Object.entries(AllPostsProperties).forEach(([key, value]) => {
      if (value.name === "狀態") {
        StatusID = key
      }
    })

    // console.log({ StatusID })

    // 獲取發布時間 ID
    let PublishTimeID = ""
    Object.entries(AllPostsProperties).forEach(([key, value]) => {
      if (value.name === "發布時間") {
        PublishTimeID = key
      }
    })

    // console.log({ PublishTimeID })

    // 獲取圖片網址
    const getCover = (id: string) => {
      let url = collectionData.recordMap.block[id].value.format?.page_cover
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

    // post 格式

    // {
    //   id: "id"
    //   title: "title"
    //   summary: "summary"
    //   category: "category"
    //   tags: ["tag1", "tag2"]
    //   status: "status"
    //   publishTime: "publishTime"
    // }

    const AllPostsList = AllPosts.map((item) => {
      // 獲取  recordMap block 裡 所有 ID 跟 AllPosts 的 ID 相同的
      const { properties } = collectionData.recordMap.block[item].value
      console.log("正在獲取", item, "文章的資訊")
      try {
        // 獲取 title
        const title = properties.title[0][0]
        // console.log({ title })
        // 獲取 summary
        const summary = properties[SummaryID][0][0]
        // console.log({ summary })
        // 獲取 category
        const category = properties[CategoryID][0][0]
        // console.log({ category })
        // 獲取 tags 有可能沒有此欄位
        const tags = properties.hasOwnProperty(TagsID) ? properties[TagsID][0][0].split(",") : []
        // console.log({ tags })
        // 獲取 status
        const status = properties[StatusID][0][0]
        // console.log({ status })
        // 獲取 publishTime
        const publishDate = properties[PublishTimeID][0][1][0][1].start_date
        const publishTime = properties[PublishTimeID][0][1][0][1].start_time
        // 轉換成 國際標準時間
        const publishTimeUTC = new Date(`${publishDate} ${publishTime}`).toISOString()
        // console.log({ publishTimeUTC })
        // 獲取圖片網址
        const cover = getCover(item)

        return {
          id: item,
          cover,
          title,
          summary,
          category,
          tags,
          status,
          publishTime: publishTimeUTC
        }
      } catch (error) {
        console.log("獲取", item, "文章的資訊失敗")
        // 若獲取錯誤不要產生此文章
        return null
      }
    }).filter((item) => item !== null)
    return AllPostsList
  }

  if (type === "count") {
    return AllPosts.length
  }
}

export default getAllPost
