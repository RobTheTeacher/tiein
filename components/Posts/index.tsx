'use client'

import { getHomePosts, getUserLocation, HomePostType, getLocationPosts } from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/browserClient";
import Link from "next/link";
import { useEffect, useState } from "react";

const Posts = () => {
  const [location, setLocation] = useState<number | null>(null)
  const [posts, setPosts] = useState<HomePostType | null>(null)

  useEffect(() => {
    const getUserState = async () => {

      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return
      setLocation(await getUserLocation(user.id))
    }

    getUserState()
  
    const fetchLocationPosts = async () => {
      if (location) {
        const { data, error } = await getLocationPosts(location);
        setPosts(data)
      } else {
        const { data, error } = await getHomePosts();
        setPosts(data
        )
      }
    }

    fetchLocationPosts()
  }, [location])

  return (
    <div className="w-full flex flex-wrap gap-8">
      {location && <p>location:{location}</p>}
      {posts && posts.map(({ id, title, author, slug, image }) =>
        <div key={id} className="basis-[calc(100%/2-32px/2)] md:basis-[calc(100%/3-32px*2/3)] flex flex-col border-1 rounded-xl">
          <Link key={id} href={`/${slug}`}>
            <div className="w-full aspect-square flex align-center justify-center overflow-hidden">{image && <img className=" w-full h-full object-contain" src={image} alt={title} />}</div>
            <h2 className="text-2xl my-2 p-2">{title}</h2>
          </Link>
          <p className="text-right my-2 p-2"><Link href={`/profile/${author?.id}`}> Posted by {author?.username}</Link></p>
        </div>)}
    </div>
  )
}

export default Posts