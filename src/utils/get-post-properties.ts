import { Block, CollectionPropertySchemaMap } from "notion-types"

import getPostCover from "./get-post-cover"

const getPostProperties = async (propertiesID: CollectionPropertySchemaMap, block: Block) => {
  const properties = block.properties
  // 獲取概述 ID
  let SummaryID = ""
  Object.entries(propertiesID).forEach(([key, value]) => {
    if (value.name === "概述") {
      SummaryID = key
    }
  })

  // console.log({ SummaryID })

  // 獲取分類 ID
  let CategoryID = ""
  Object.entries(propertiesID).forEach(([key, value]) => {
    if (value.name === "分類") {
      CategoryID = key
    }
  })

  // console.log({ CategoryID })

  // 獲取標籤 ID
  let TagsID = ""
  Object.entries(propertiesID).forEach(([key, value]) => {
    if (value.name === "標籤") {
      TagsID = key
    }
  })

  // console.log({ TagsID })

  // 獲取狀態 ID
  let StatusID = ""
  Object.entries(propertiesID).forEach(([key, value]) => {
    if (value.name === "狀態") {
      StatusID = key
    }
  })

  // console.log({ StatusID })

  // 獲取發布時間 ID
  let PublishTimeID = ""
  Object.entries(propertiesID).forEach(([key, value]) => {
    if (value.name === "發布時間") {
      PublishTimeID = key
    }
  })

  // 獲取 publishTime
  const publishDate = properties[PublishTimeID][0][1][0][1].start_date
  const publishTime = properties[PublishTimeID][0][1][0][1].start_time || "00:00"
  // // 轉換成 國際標準時間
  const publishTimeUTC = new Date(`${publishDate} ${publishTime}`).toISOString()

  //   獲取圖片網址
  const cover = getPostCover(block.format?.page_cover, block.id)

  return {
    cover,
    summary: properties[SummaryID][0][0],
    category: properties[CategoryID][0][0],
    tags: properties[TagsID][0][0].split(","),
    status: properties[StatusID][0][0],
    publishTime: publishTimeUTC
  }
}

export default getPostProperties
