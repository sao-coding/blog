import Post from "@/app/post/[id]/post"
// import { site } from "@/config/site"
// import { Post as PostType } from "@/types"
// import getPost from "@/utils/post"

// export async function generateMetadata({ params }: { params: { id: string } }) {
//   const post = (await getPost("one", Number(params.id))) as PostType
//   if (!post) return { notFound: true }

//   return {
//     openGraph: {
//       title: post.title,
//       description: post.content,
//       type: "article",
//       url: `${site.url}/post/${params.id}`,
//       article: {
//         publishedTime: post.date,
//         authors: [post.publisher.name],
//         tags: [post.category]
//       },
//       images: [
//         {
//           url: `${site.url}/api/og/?title=${post.title}&date=${post.date}`,
//           width: 1200,
//           height: 630,
//           alt: post.title,
//           type: "image/png"
//         }
//       ]
//     }
//   }
// }

const PostPage = ({ params }: { params: { id: string } }) => {
  return <Post params={params} />
}

export default PostPage
