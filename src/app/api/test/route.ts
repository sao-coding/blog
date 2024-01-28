import { NextRequest, NextResponse } from "next/server"
import { NotionAPI } from "notion-client"

const notion = new NotionAPI()
export const GET = async (req: NextRequest) => {
  // 02ab3b8678004aa69e9e415905ef32a5?v=b7eb215720224ca5827bfaa5ef82cf2d
  //   adf1e43ff0e24b49a72bef07cbb0b882?v=726641f25bab4e28a6e4e4b620d56933
  //   03afd5b6-6641-4fd3-869d-b246ed4ffba9?v=fb5085bc-6092-4089-a4f8-bbe698064172
  //   const recordMap = await notion.getPage("097e5f674880459d8e1b4407758dc4fb")
  const collectionId = "4379bc14-5d22-453b-a153-12639616fc01"
  const collectionViewId = "b7eb2157-2022-4ca5-827b-faa5ef82cf2d"

  return NextResponse.json({})
}
