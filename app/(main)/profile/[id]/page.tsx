import { getUserName, getUserPosts, getUserTies } from "@/utils/supabase/queries"
import { createClient } from "@/utils/supabase/serverClient"
import Link from "next/link"
import Menu from "../menu"
import UserTies from "../ties"
import UserLoops from "../loops"

const ProfilePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const { data, error } = await getUserPosts(id)

  /* Need to get the username in another way, some user will not have any posts */
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser();
  const profileName = await getUserName(id)
  let threadsTitle = user && user.id === id ? "All your threads" : `${profileName}'s threads`
  
  if (!data || data.length === 0) {
    threadsTitle = user && user.id === id ? "You haven't made a thread yet" : `${profileName} hasn't made a thread yet`
  }

  return (
    <div>
      <h1 className="text-4xl text-center mb-8 mt-8">{threadsTitle}</h1>
      <div className="w-full flex flex-wrap">
        {user && <Menu />}
        <div className={`${user ? ' p-4 md:basis-4/5 md:pl-8' : 'w-full'} flex flex-wrap gap-8`}>
          {data && data.map(({ id, title, author, slug, image }, index) =>
            <Link className="basis-[calc(100%/2-32px/2)] md:basis-[calc(100%/3-32px*2/3)] flex flex-col border-1 rounded-xl" key={index} href={`/${slug}`}>
              <div className="w-full aspect-square flex align-center justify-center overflow-hidden">
                {image && <img className=" w-full h-full object-contain" src={image} alt={title} />}</div>
              <h2 className="text-2xl my-2 p-2">{title}</h2>
            </Link>)}
        </div>
      </div>
      <UserTies id={id} />
      <UserLoops id={id} />
    </div>
  )
}

export default ProfilePage