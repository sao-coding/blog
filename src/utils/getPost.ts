import { NotionAPI } from "notion-client"
import { PageBlock } from "notion-types"
import { getPageTableOfContents } from "notion-utils"

const getPost = async (id: string) => {
  const api = new NotionAPI()
  const post = await api.getPage(id)

  const pageKey = Object.keys(post.block).find((key) => post.block[key].value.type === "page")
  const pageBlock = pageKey ? post.block[pageKey].value : null
  // console.log("pageBlock", pageBlock)

  const toc = await getPageTableOfContents(pageBlock as PageBlock, post)
  return {
    toc,
    content: post
  }
}

export default getPost
