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
import { Properties } from "@/types"

import getPostProperties from "./get-post-properties"

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

const getAllPost = async (type: string, page?: number, category?: string, tag?: string) => {
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
  // console.log({ AllPosts })
  if (type === "all") {
    // 輸出目前頁數的文章
    // if (page) {
    //   // 先判斷文章的 status 是否為發布
    //   // 在做分頁
    //   // AllPosts = AllPosts.slice((page - 1) * limit, page * limit)
    // }
    console.log({ AllPosts })
    // 獲取全部欄位
    const AllPostsProperties = Object.entries(collectionData.recordMap.collection)[0][1].value
      .schema

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

    let AllPostsList = await Promise.all(
      AllPosts.map(async (item) => {
        // 獲取  recordMap block 裡 所有 ID 跟 AllPosts 的 ID 相同的
        const block = collectionData.recordMap.block[item].value
        console.log("正在獲取", item, "文章的資訊")
        try {
          // 獲取 title
          const title = block.properties.title[0][0]
          console.log({ title })
          const properties: Properties = await getPostProperties(AllPostsProperties, block)
          console.log("獲取", item, "文章的資訊成功")
          return {
            id: item,
            cover: properties.cover,
            title,
            summary: properties.summary,
            category: properties.category,
            tags: properties.tags,
            status: properties.status,
            publishTime: properties.publishTime
          }
        } catch (error) {
          console.log("獲取", item, "文章的資訊失敗")
          // 若獲取錯誤不要產生此文章
          return null
        }
      })
    )
    console.log({ AllPostsList })
    AllPostsList = AllPostsList.filter((item) => item !== null && item.status === "發布")

    if (category) {
      AllPostsList = AllPostsList.filter((item) => item!.category === category)
    }

    if (tag) {
      AllPostsList = AllPostsList.filter((item) => item!.tags.includes(tag))
    }

    if (page) {
      AllPostsList = AllPostsList.slice((page - 1) * limit, page * limit)
    }

    return AllPostsList
  }

  if (type === "total") {
    // 判斷文章的 status 是否為發布
    // 在輸出文章的總數
    let total = 0
    const AllPostsProperties = Object.entries(collectionData.recordMap.collection)[0][1].value
      .schema
    await Promise.all(
      AllPosts.map(async (item) => {
        const block = collectionData.recordMap.block[item].value
        try {
          const properties: Properties = await getPostProperties(AllPostsProperties, block)
          if (properties.status === "發布") {
            total++
          }
        } catch (error) {
          return null
        }
      })
    )
    return total
  }
}

export default getAllPost
