import { HomePostType } from "@/lib/supabase/queries"
import Post from "../Post"

const TodaysEvents = ({ posts }: { posts: HomePostType | null }) => {
  return (
    <>
      {posts && posts.length ?
        <div className="flex p-4 justify-start gap-8 flex-wrap my-4">
          <h2 className="basis-full">Today's events</h2>
          {posts.map(post => <Post key={post.id} {...post} />)}
        </div>
        :
        <h2 className="subTitle">Nothing happening today</h2>
      }
    </>
  )
}

export default TodaysEvents