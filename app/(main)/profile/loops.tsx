import { getUserLoops, getUserTies } from "@/lib/supabase/queries"
import Link from "next/link"

const UserLoops = async ({ id, userName, isAuthor }: { id: string, userName:string, isAuthor:boolean }) => {
  const loops = await getUserLoops(id)
  return (
    <>
      {loops?.length > 0 &&
        <>
          <h2 className="text-4xl text-center mb-8 mt-8">{isAuthor ? "Loops for you" : `Loops for ${userName}'s ties`}</h2>
          <div className='p-4 flex flex-wrap gap-8'>
            {loops.map(({ post }, index) =>
              <Link key={`loop-${index}`} className="basis-[calc(100%/2-32px/2)] md:basis-[calc(100%/3-32px*2/3)] flex flex-col border" href={`/${post?.id}-${post?.slug}`}>
                <div className="w-full aspect-square flex align-center justify-center overflow-hidden">
                  {post?.image && <img className=" w-full h-full object-contain" src={post?.image} alt={post?.title} />}</div>
              </Link>)}
          </div>
        </>
      }
    </>
  )
}

export default UserLoops