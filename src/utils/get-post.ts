import { NotionAPI } from "notion-client"
import { PageBlock } from "notion-types"
import { getPageTableOfContents } from "notion-utils"

import getPostProperties from "./get-post-properties"

const getPost = async (id: string) => {
  const api = new NotionAPI()
  const post = await api.getPage(id)

  const pageKey = Object.keys(post.block).find((key) => post.block[key].value.type === "page")
  const pageBlock = pageKey ? post.block[pageKey].value : null
  const toc = await getPageTableOfContents(pageBlock as PageBlock, post)

  // 獲取全部欄位 ID
  // const AllPostsProperties = Object.entries(collectionData.recordMap.collection)[0][1].value.schema

  const propertiesID = Object.entries(post.collection)[0][1].value.schema

  // 獲取 第一個 block 裡面的 properties
  const pageProperties = post.block[Object.keys(post.block)[0]].value

  const title = pageProperties.properties.title[0][0]

  const properties = await getPostProperties(propertiesID, pageProperties)
  console.log({ properties })
  return {
    toc,
    title,
    properties,
    content: post
  }
}

export default getPost
