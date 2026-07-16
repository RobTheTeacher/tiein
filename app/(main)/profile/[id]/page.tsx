/*

if user
  link to profile page
  get all from auth user
  get all posts where user = author
*/

import { getUserPosts, getUserTies } from "@/utils/supabase/queries"
import { createClient } from "@/utils/supabase/serverClient"
import Link from "next/link"
import Menu from "../menu"

const ProfilePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const { data, error } = await getUserPosts(id)
  const username = data![0].author
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser();

  const ties = await getUserTies(id)

  return (
    <div>
      <h1 className="text-4xl text-center mb-8 mt-8">{user && user.id === id ? "All your threads" : `${username.username}'s threads`}</h1>
      <div className="w-full flex flex-wrap">
        {user && <Menu />}
        <div className={`${user ? 'basis-4/5 pl-8' : 'w-full'} flex flex-wrap gap-8`}>
          {data && data.map(({ id, title, author, slug, image }) =>
            <Link className="basis-[calc(100%/2-32px/2)] md:basis-[calc(100%/3-32px*2/3)] flex flex-col border-1 rounded-xl" key={id} href={`/${slug}`}>
              <div className="w-full aspect-square flex align-center justify-center overflow-hidden">
                {image && <img className=" w-full h-full object-contain" src={image} alt={title} />}</div>
              <h2 className="text-2xl my-2 p-2">{title}</h2>
            </Link>)}
        </div>
      </div>

      {ties?.length &&
        <>
          <h2 className="text-4xl text-center mb-8 mt-8">{user && user.id === id ? "All your ties" : `${username.username}'s ties`}</h2>
          <div className='pl-8 md:ml-auto md:w-[80%] flex flex-wrap gap-8'>
            {ties.map(({ id, title, author, slug, image }) =>
              <Link className="basis-[calc(100%/2-32px/2)] md:basis-[calc(100%/3-32px*2/3)] flex flex-col border-1 rounded-xl" key={id} href={`/${slug}`}>
                <div className="w-full aspect-square flex align-center justify-center overflow-hidden">
                  {image && <img className=" w-full h-full object-contain" src={image} alt={title} />}</div>
                <h2 className="text-2xl my-2 p-2">{title}</h2>
              </Link>)}
          </div>
        </>
      }
    </div>
  )
}

export default ProfilePage