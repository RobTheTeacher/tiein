import { HomePostType } from "@/lib/supabase/queries"
import Post from "../Post"

const TodaysEvents = ({ posts }: { posts: HomePostType | null }) => {
  return (
    <>
      {posts && posts.length ?
        <div className="flex p-4 justify-start gap-4 flex-wrap my-4">
          <h2 className="basis-full">Today's events</h2>
          {posts.map((post, index) =>
            <div key={index} className="basis-[calc(100%/2-16px/2)] md:basis-[calc(100%/3-32px*2/3)] flex flex-col border-1 rounded-xl overflow-hidden">
              <Post {...post} />
            </div>
          )}
        </div>
        :
        <h2 className="subTitle">Nothing happening today</h2>
      }
    </>
  )
}

export default TodaysEvents