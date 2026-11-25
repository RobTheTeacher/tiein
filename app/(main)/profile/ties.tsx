import { getUserTies } from "@/lib/supabase/queries"
import Link from "next/link"

const UserTies = async ({ id, userName, isAuthor }: { id: string, userName:string, isAuthor:boolean }) => {

  const ties = await getUserTies(id)
  return (
    <>
      {ties?.length > 0 &&
        <>
          <h2 className="text-4xl text-right mb-8 mt-8">{isAuthor ? "Your ties" : `${userName}'s ties`}</h2>
          <div className='p-4 flex flex-wrap gap-8'>
            {ties.map(({post}, index) =>
              <Link key={`tie-${index}`} className="basis-[calc(100%/2-32px/2)] md:basis-[calc(100%/3-32px*2/3)] flex flex-col border" href={`/${post?.id}-${post?.slug}`}>
                <div className="w-full aspect-square flex align-center justify-center overflow-hidden">
                  {post?.image && <img className=" w-full h-full object-contain" src={post?.image} alt={post?.title} />}</div>
              </Link>)}
          </div>
        </>
      }
    </>
  )
}

export default UserTies