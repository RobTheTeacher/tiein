'use client'

import { getHomePosts, getUserLocation, HomePostType, getLocationPosts, getLocations } from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/browserClient";
import Link from "next/link";
import { useEffect, useState } from "react";
import Post from "./Post";

type State = {
  created_at: string;
  id: number;
  location: string;
}

const Posts = () => {
  const [location, setLocation] = useState<number | null>(null)
  const [posts, setPosts] = useState<HomePostType | null>(null)
  const [locationPosts, setLocationPosts] = useState<HomePostType | null>(null)
  const [states, setStates] = useState<State[] | null>(null)
  const [locationName, setLocationName] = useState<string | null>()
  useEffect(() => {
    const getUserState = async () => {
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return
      setLocation(await getUserLocation(user.id))
    }

    getUserState()

    const fetchPosts = async () => {
      const { data, error } = await getHomePosts();
      setPosts(data)
    }
    fetchPosts()

    const getStates = async () => {
      const data = await getLocations()
      setStates(data)
    }

    getStates()
  }, [])

  useEffect(() => {
    const getPostsByLocation = async () => {
      const loadedPosts = await posts
      const loadedLocation = await location

      if (loadedPosts) {
        if (loadedLocation) {
          setLocationPosts(loadedPosts!.filter(item => item.state === location))

          const currentState = states?.find(state => state.id === location)
          setLocationName(currentState ? currentState.location : "Every where")
        } else setLocationPosts(posts)
      }
    }

    getPostsByLocation()
  }, [location])
  return (
    <div className="w-full flex flex-wrap gap-8">
      {states &&
        <div>
          <p>Select your state</p>
          <select onChange={e => setLocation(parseInt(e.target.value))}>
            <option key={null} value={undefined}>Everywhere</option>
            {states.map(state => <option key={state.id} value={state.id}>{state.location}</option>)}
          </select>
        </div>
      }
      <h2>Events in {location ? locationName : "Everywhere"}</h2>
      {locationPosts ? locationPosts.map((post, index) =>
        <div key={index} className="basis-[calc(100%/2-32px/2)] md:basis-[calc(100%/3-32px*2/3)] flex flex-col border-1 rounded-xl">
          <Post {...post} />
        </div>
      ) : posts && posts.map((post, index) =>
        <div key={index} className="basis-[calc(100%/2-32px/2)] md:basis-[calc(100%/3-32px*2/3)] flex flex-col border-1 rounded-xl">
          <Post {...post} />
        </div>)
      }
    </div>
  )
}

export default Posts