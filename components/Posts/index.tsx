'use client'

import { getHomePosts, getUserLocation, HomePostType, getLocationPosts, getLocations } from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/browserClient";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import Post from "./Post";

type State = {
  created_at: string;
  id: number;
  location: string;
}

const Posts = () => {
  const [loading, setLoading] = useState<boolean>(true)
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

    const getStates = async () => {
      const data = await getLocations()
      setStates(data)
    }
    getStates()
  }, [])

  useEffect(() => {
    const getPostsByLocation = async () => {
      try {
        setLoading(true)
        const { data, error } = await getHomePosts();
        setPosts(data)
        if (data) {
          setLocationPosts(location ? data!.filter(item => item.state === location) : data)
          const currentState = states?.find(state => state.id === location)
          setLocationName(currentState ? currentState.location : "Every where")
        }
      } finally {
        setLoading(false)
      }
    }

    getPostsByLocation()
  }, [location])
  return (
    <div className="w-full flex flex-wrap gap-8">
      {loading ? <img src="loading.gif" alt="loading..." /> :
        <>
          <div className="basis-full flex relative justify-center mb-12">
            {states &&
              <div className="absolute left-0">
                <p>Select your state</p>
                <select onChange={e => setLocation(parseInt(e.target.value))}>
                  <option key={null} value={undefined}>Everywhere</option>
                  {states.map(state => <option key={state.id} value={state.id}>{state.location}</option>)}
                </select>
              </div>
            }
            <h2 className="pageTitle">{`Events ${location ? `in ${locationName}` : "every where"}`}</h2>
          </div>

          {locationPosts && locationPosts.length ? locationPosts.map((post, index) =>
            <div key={index} className="basis-[calc(100%/2-32px/2)] md:basis-[calc(100%/3-32px*2/3)] flex flex-col border-1 rounded-xl">
              <Post {...post} />
            </div>
          ) : <h2 className="subTitle">{`No events in ${locationName ? locationName : "every where"}. This is an opportunity to get the ball rolling!`}</h2>
          }
        </>
      }
    </div>
  )
}

export default Posts