import { checkUserLoops, checkUserTies, getSinglePost } from "@/utils/supabase/queries"
import Link from "next/link"
import { createClient } from "@/utils/supabase/serverClient"

import LoopButton from "./loopButton"
import TieButton from "./tieButton"

const PostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const { data, error } = await getSinglePost(slug)
  const { id, title, image, content, author, date, time } = { ...data }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser();

  let tiedIn = user ? await checkUserTies(user.id, id!) : false
  let loopedIn = user ? await checkUserLoops(user.id, id!) : false

  return (
    <>
      {data &&
        <div className="p-4" >
          {date && <div className="">
            <div>When: {date}</div>
            {time && <div>Starts at: {time}</div>}
          </div>
          }
          <h1 className="text-6xl my-8">{title}</h1>
          <div className="gap-8">
            <div className="">
              <img className="w-auto h-full" src={image ? image : '/tie-in-logo.gif'} alt={title} />
            </div>
            <div className="my-8">
              <div>{content}</div>
            </div>
          </div>
          <h2 className="my-4 text-right"><Link href={`/profile/${author?.id}`}>Thread created by {author?.username}</Link></h2>
          {user ? user.id !== author?.id &&
            <div>
              <div className="my-8">
                <h2>Want to follow this event?</h2>
                <p>Tie in if you are going, or stay in the loop</p>
                <div className="flex flex-col md:flex-row gap-4 my-4">
                  <TieButton user={user.id} post={id!} tiedIn={tiedIn} />
                  <LoopButton user={user.id} post={id!} loopedIn={loopedIn} />
                </div>
              </div>
            </div>
            : <></>
          }
        </div >
      }
    </>
  )
}

export default PostPage