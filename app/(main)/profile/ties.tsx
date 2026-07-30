import { getUserTies } from "@/utils/supabase/queries"
import Link from "next/link"

const UserTies = async ({ id }: { id: string }) => {

  const ties = await getUserTies(id)
  return (
    <>
      {ties?.length > 0 &&
        <>
          <h2 className="text-4xl text-center mb-8 mt-8">"All your ties"</h2>
          <div className='pl-8 md:ml-auto md:w-[80%] flex flex-wrap gap-8'>
            {ties.map(({ post }) =>
              <Link className="basis-[calc(100%/2-32px/2)] md:basis-[calc(100%/3-32px*2/3)] flex flex-col border-1 rounded-xl" key={post?.id} href={`/${post?.slug}`}>
                <div className="w-full aspect-square flex align-center justify-center overflow-hidden">
                  {post?.image && <img className=" w-full h-full object-contain" src={post?.image} alt={post?.title} />}</div>
                <h2 className="text-2xl my-2 p-2">{post?.title}</h2>
              </Link>)}
          </div>
        </>
      }
    </>
  )
}

export default UserTies