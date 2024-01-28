import { NextRequest, NextResponse } from "next/server"
import { AggregationResult, CollectionViewType, ID, RecordMap } from "notion-types"

import { PostCard } from "@/types"
import getAllPost from "@/utils/getAllPost"

type CollectionInstance = {
  recordMap: RecordMap
  result: CollectionQueryResult
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

export const GET = async (req: NextRequest) => {
  const postList = (await getAllPost("all")) as PostCard[]

  //   產生分頁 id
  //   [
  //     ["10cb2de4-9edd-4523-b314-44281729d029", "c79f71da-c9ca-4e7f-b734-e35ba3b4a65c"],
  //     ["c79f71da-c9ca-4e7f-b734-e35ba3b4a65c", "c79f71da-c9ca-4e7f-b734-e35ba3b4a65c"],
  //   ]

  if (postList) {
    const listID = postList.map((item) => item.id)
    // 兩筆一組
    const pageID = listID.reduce((acc, cur, index) => {
      if (index % 2 === 0) {
        acc.push([cur, listID[index + 1]])
      }
      return acc
    }, [] as string[][])

    // desc PageID
    // pageID.reverse()

    return NextResponse.json(pageID)
  }

  return NextResponse.json([])
}
