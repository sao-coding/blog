import { NextRequest, NextResponse } from "next/server"
import { AggregationResult, CollectionViewType, ID, RecordMap } from "notion-types"

import getAllPost from "@/utils/getAllPost"
import getPost from "@/utils/getPost"

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
  const type = req.nextUrl.searchParams.get("type")
  const id = req.nextUrl.searchParams.get("id")
  const page = req.nextUrl.searchParams.get("page") || 1

  //   export interface CollectionInstance {
  //     recordMap: RecordMap;
  //     result: CollectionQueryResult;
  // }

  // 03afd5b6-6641-4fd3-869d-b246ed4ffba9?v=fb5085bc-6092-4089-a4f8-bbe698064172
  if (type === "all") {
    return NextResponse.json(await getAllPost(type, Number(page)))
  }

  if (type === "count") {
    return NextResponse.json({ count: await getAllPost(type) })
  }

  if (type === "one" && id) {
    return NextResponse.json(await getPost(id))
  }

  return NextResponse.json({})
}
