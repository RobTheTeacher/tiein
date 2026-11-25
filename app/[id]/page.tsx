import { checkUserLoops, checkUserTies, getComments, getSinglePost } from "@/lib/supabase/queries"
import Link from "next/link"
import { createClient } from "@/lib/supabase/serverClient"
import LoopButton from "./loopButton"
import TieButton from "./tieButton"
import DeleteButton from "./deleteButton"
import Comments from "@/components/Comments"

const PostPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  let pageId = parseInt(id.split("-")[0])
  const { data, error } = await getSinglePost(pageId)
  const { title, slug, image, content, author, state, date, time } = { ...data }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser();
  const isAuthor = user && user.id === author?.id ? true : false;
  let tiedIn = user ? await checkUserTies(user.id, pageId!) : false
  let loopedIn = user ? await checkUserLoops(user.id, pageId!) : false
  const comments = await getComments(pageId)

  return (
    <div className="order-3 md:order-2 md:basis-17/23 m-4 md:py-4 md:mt-16
    md:bg-linear-to-r from-blue to-10% bg-faded-dark-blue from-10%">

      {data &&
        <div className="p-4 flex flex-wrap font-heading">
          <div className="gap-8 flex flex-wrap font-heading">
            <div className="md:basis-[calc(50%-32px)]">
              <img className="w-full h-auto m-auto aspect-square" src={image ? image : '/tie-in-logo.gif'} alt={title} />
            </div>
            <div className="md:basis-[calc(50%-32px)] flex flex-col gap-8">
              <h1 className="text-6xl my-8">{title}</h1>
              <div className="flex flex-wrap grow justify-between">
                <div>{content}</div>
                <div className="flex flex-col gap-4 justify-end">
                  <h2 className="self-end"><Link href={`/profile/${author?.id}`}>Shared by {author?.username}</Link></h2>
                  {isAuthor &&
                    <div className="flex justify-between">
                      <Link href={`/${pageId}-${slug}/edit`} className="linkButton text-orange">Edit</Link>
                      <DeleteButton postId={pageId!} />
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="md:pl-[10%] mt-4 basis-[calc(50%-16px)]">
            {
              date && <div className="">
                <div>In {state?.location}</div>
                <div>On {date}</div>
                {time && <div>At {time}</div>}
              </div>
            }
          </div>
          {(user && !isAuthor) &&
            <div className="w-full md:pl-[10%]">
              <h2>Want to follow this event?</h2>
              <p>Tie in if you are going, or stay in the loop</p>
              <div className="flex flex-col justify-between md:flex-row gap-4 my-4">
                <TieButton user={user.id} post={pageId!} tiedIn={tiedIn} />
                <LoopButton user={user.id} post={pageId!} loopedIn={loopedIn} />
              </div>
            </div>
          }
          <div className="md:pl-[10%] w-full">
            <Comments comments={comments} postId={pageId} isAuthor={isAuthor} userId={user ? user.id : null} />
          </div>
        </div >
      }
    </div>
  )
}

export default PostPage