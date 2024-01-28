import { NextRequest, NextResponse } from "next/server"
import { NotionAPI } from "notion-client"

const notion = new NotionAPI()
export const GET = async (req: NextRequest) => {
  // const post = await notion.getCollectionData(
  //   "03afd5b6-6641-4fd3-869d-b246ed4ffba9",
  //   "fb5085bc-6092-4089-a4f8-bbe698064172",
  //   "文章"
  // )

  const post = await notion.getPage("2d3d912f-cf84-4de5-b3a5-b28bb4f3ad3a", {
    concurrency: 1,
    fetchMissingBlocks: true,
    fetchCollections: true,
    signFileUrls: true,
    chunkLimit: 1,
    chunkNumber: 0
  })

  return NextResponse.json(post)
}
