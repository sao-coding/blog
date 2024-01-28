import { NextRequest, NextResponse } from "next/server"
import { NotionAPI } from "notion-client"
import { SelectOption } from "notion-types"

export const GET = async (req: NextRequest) => {
  const type = req.nextUrl.searchParams.get("type")
  const api = new NotionAPI()
  const collectionData = await api.getCollectionData(
    "03afd5b6-6641-4fd3-869d-b246ed4ffba9",
    "fb5085bc-6092-4089-a4f8-bbe698064172",
    "文章"
  )
  //   尋找所有標籤
  //   "collection": {
  //     "03afd5b6-6641-4fd3-869d-b246ed4ffba9": {
  //         "value": {
  //             "id": "03afd5b6-6641-4fd3-869d-b246ed4ffba9",
  //             "version": 63,
  //             "name": [
  //                 [
  //                     "blog"
  //                 ]
  //             ],
  //             "schema": {
  const collection = collectionData.recordMap.collection
  const tagsList: SelectOption[] = []
  let tagsCount = 0
  if (collection) {
    const tags = Object.entries(collection)[0][1].value.schema
    // 尋找 name 為 標籤 的欄位 查看標籤數量

    Object.entries(tags).forEach(([key, value]) => {
      if (value.name === "標籤") {
        if (value.options) {
          value.options.forEach((option) => {
            tagsList.push({
              id: option.id,
              color: option.color,
              value: option.value
            })
          })
          tagsCount = value.options.length
        }
      }
    })
  }

  if (type === "list") {
    return NextResponse.json(tagsList)
  }

  if (type === "count") {
    return NextResponse.json({ count: tagsCount })
  }

  return NextResponse.json({ list: tagsList, count: tagsCount })
}
