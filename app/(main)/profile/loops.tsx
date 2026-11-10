import { getUserLoops, getUserTies } from "@/lib/supabase/queries"
import Link from "next/link"

const UserLoops = async ({ id }: { id: string }) => {
  const loops = await getUserLoops(id)
  return (
    <>
      {loops?.length > 0 &&
        <>
          <h2 className="text-4xl text-center mb-8 mt-8">Keep me in the loop</h2>
          <div className='pl-8 md:ml-auto md:w-[80%] flex flex-wrap gap-8'>
            {loops.map(({ post }, index) =>
              <Link className="basis-[calc(100%/2-32px/2)] md:basis-[calc(100%/3-32px*2/3)] flex flex-col border-1 rounded-xl" key={index} href={`/${post?.id}-${post?.slug}`}>
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

export default UserLoops