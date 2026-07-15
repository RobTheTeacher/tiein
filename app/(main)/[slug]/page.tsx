import { getSinglePost } from "@/utils/supabase/queries"
import Link from "next/link"

const PostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const { data, error } = await getSinglePost(slug)
  const { title, image, content, author } = { ...data }

  return (
    <>
      {data &&
        <div>
          <h1 className="text-4xl my-4">{title}</h1>
          <div className="flex gap-8">
            <div className="flex-2/3">
              <img className="w-auto h-full" src={image ? image : '...'} alt={title} />
            </div>
            <div className="flex-1/3 flex-col gap-4">
              <div>{content}</div>
              <div>Comments todo</div>
            </div>
          </div>
          <h2 className="my-4"><Link href={`/profile/${author?.id}`}> Posted by {author?.username}</Link></h2>
        </div>
      }</>
  )
}

export default PostPage