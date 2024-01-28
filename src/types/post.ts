// [
//     {
//         "id": "c79f71da-c9ca-4e7f-b734-e35ba3b4a65c",
//         "title": "這是我第一篇文章",
//         "summary": "這是一個概述",
//         "category": "生活",
//         "tags": [],
//         "status": "發布",
//         "publishTime": "2024-01-25T18:04:00.000Z"
//     },
//     {
//         "id": "2d3d912f-cf84-4de5-b3a5-b28bb4f3ad3a",
//         "title": "a001: 哈囉",
//         "summary": "超簡單啦",
//         "category": "解題",
//         "tags": [
//             "ZeroJudge",
//             "Python"
//         ],
//         "status": "草稿",
//         "publishTime": "2024-01-26T06:15:00.000Z"
//     },
//     {
//         "id": "10cb2de4-9edd-4523-b314-44281729d029",
//         "title": "",
//         "summary": "",
//         "category": "",
//         "tags": [],
//         "status": "",
//         "publishTime": ""
//     }
// ]

import { ExtendedRecordMap } from "notion-types"
import { TableOfContentsEntry } from "notion-utils"

export type PostCard = {
  id: string
  cover: string
  title: string
  summary: string
  category: string
  tags: string[]
  status: string
  publishTime: string
}

export type Post = {
  toc: TableOfContentsEntry[]
  content: ExtendedRecordMap
}
// export type AllPosts = Post[]
