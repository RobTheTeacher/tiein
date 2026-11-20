import { HomePostType } from "@/lib/supabase/queries"
import Post from "../Post"

const PastEvents = ({ posts, location }: { posts: HomePostType | null, location: string | null }) => {
  return (
    <div className="my-4">
      {posts && posts.length ?
        <div className="flex p-4 justify-start gap-8 flex-wrap">
          <h2 className="basis-full">Past Events</h2>
          {posts.map(post => <Post key={post.id} {...post} />)}
        </div>
        : <h2 className="subTitle">{`No past events in ${location ? location : "every where"}. This is an opportunity to get the ball rolling!`}</h2>
      }
    </div>
  )
}

export default PastEvents