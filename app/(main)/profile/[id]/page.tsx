import { getUserName, getUserPosts, getUserTies } from "@/lib/supabase/queries"
import { createClient } from "@/lib/supabase/serverClient"
import Link from "next/link"
import Menu from "../menu"
import UserTies from "../ties"
import UserLoops from "../loops"

const ProfilePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const { data, error } = await getUserPosts(id)

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser();
  const profileName = await getUserName(id)
  const isAuthor: boolean = user && user.id === id ? true : false
  let threadsTitle = isAuthor ? "All your threads" : `${profileName}'s threads`

  if (!data || data.length === 0) {
    threadsTitle = isAuthor ? "You haven't made a thread yet" : `${profileName} hasn't made a thread yet`
  }

  return (
    <div className="font-heading">
      <h1 className="text-4xl mb-8 mt-8">{threadsTitle}</h1>
      <div className="w-full flex flex-wrap">
        {/*user && <Menu />*/}
        <div className={`w-full flex flex-wrap gap-8`}>
          {data && data.map(({ id, title, author, slug, image }, index) =>
            <Link className="basis-[calc(100%/2-32px/2)] md:basis-[calc(100%/3-32px*2/3)] flex flex-col border-1" key={index} href={`/${id}-${slug}`}>
              <div className="w-full aspect-square flex align-center justify-center overflow-hidden">
                {image && <img className=" w-full h-full object-contain" src={image} alt={title} />}</div>
            </Link>)}
        </div>
      </div>
      {isAuthor && <UserLoops id={id} userName={profileName} isAuthor={isAuthor} />}
      <UserTies id={id} userName={profileName} isAuthor={isAuthor} />
    </div>
  )
}

export default ProfilePage