import { HomePostType } from "@/lib/supabase/queries"
import Post from "../Post"

const UpcomingEvents = ({ posts, location }: { posts: HomePostType | null, location: string |  null }) => {
  return (
    <div className="my-4">
      {posts && posts.length ?
        <div className="flex p-8 justify-between gap-8 flex-wrap">
          <h2 className="basis-full">Upcoming Events</h2>
          {posts.map((post, index) => <Post key={post.id} {...post} />)}
        </div>
        : <h2 className="subTitle">{`No upcoming events in ${location ? location : "every where"}. This is an opportunity to get the ball rolling!`}</h2>
      }
    </div>
  )
}

export default UpcomingEvents