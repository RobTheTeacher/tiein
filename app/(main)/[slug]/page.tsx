import { checkUserLoops, checkUserTies, getSinglePost } from "@/utils/supabase/queries"
import Link from "next/link"
import { createClient } from "@/utils/supabase/serverClient"

import LoopButton from "./loopButton"
import TieButton from "./tieButton"

const PostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const { data, error } = await getSinglePost(slug)
  const { id, title, image, content, author } = { ...data }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser();

  let tiedIn = user ? await checkUserTies(user.id, id!) : false

  let loopedIn = user ? await checkUserLoops(user.id, id!) : false

  console.log("Tied in: ", tiedIn)

  return (
    <>
      {data &&
        <div className="p-4" >
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
          {user ? user.id !== author?.id &&
            <div>
              <div className="flex flex-col md:flex-row gap-4">
                <TieButton user={user.id} post={id!} tiedIn={tiedIn} />
                <LoopButton user={user.id} post={id!} loopedIn={loopedIn} />
              </div>
            </div>
            : <></>
          }
        </div>

      }
    </>
  )
}

export default PostPage