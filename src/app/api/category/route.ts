import { NextRequest, NextResponse } from "next/server"
import { NotionAPI } from "notion-client"

import { PostCard, SelectOptionList } from "@/types"
import getAllPost from "@/utils/get-all-post"

export const GET = async (req: NextRequest) => {
  const type = req.nextUrl.searchParams.get("type")
  const api = new NotionAPI()
  const collectionData = await api.getCollectionData(
    "03afd5b6-6641-4fd3-869d-b246ed4ffba9",
    "fb5085bc-6092-4089-a4f8-bbe698064172",
    "文章"
  )
  //   尋找所有分類
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

  //   SelectOptionList 等於 SelectOption + total

  const collection = collectionData.recordMap.collection
  const categoriesList: SelectOptionList[] = []
  let categoriesTotal = 0
  if (collection) {
    const tags = Object.entries(collection)[0][1].value.schema
    // 尋找 name 為 分類 的欄位 查看分類數量

    Object.entries(tags).forEach(([key, value]) => {
      if (value.name === "分類") {
        if (value.options) {
          value.options.forEach((option) => {
            categoriesList.push({
              id: option.id,
              color: option.color,
              value: option.value
            })
          })
          categoriesTotal = value.options.length
        }
      }
    })
  }

  if (type === "list") {
    const AllPosts = (await getAllPost("all")) as PostCard[]
    // 每個分類的文章數量

    categoriesList.forEach((category) => {
      category.total = AllPosts.filter((post) => {
        return post.category === category.value
      }).length
    })

    return NextResponse.json(categoriesList)
  }

  if (type === "total") {
    return NextResponse.json({ total: categoriesTotal })
  }

  return NextResponse.json({ list: categoriesList, total: categoriesTotal })
}
