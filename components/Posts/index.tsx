'use client'

import { getHomePosts, getUserLocation, HomePostType, getLocationPosts, getLocations } from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/browserClient";
import { useEffect, useState } from "react";
import Post from "./Post";
import StateSelectOption from "../StateSelect";
import { CaretDownIcon } from "@phosphor-icons/react";

type StateType = {
  created_at: string;
  id: number;
  location: string;
}

const Posts = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [location, setLocation] = useState<number | null>(null)
  const [posts, setPosts] = useState<HomePostType | null>(null)
  const [locationPosts, setLocationPosts] = useState<HomePostType | null>(null)
  const [states, setStates] = useState<StateType[] | null>(null)
  const [locationName, setLocationName] = useState<string | null>("Every Where")
  const [openStates, setOpenStates] = useState<boolean>(false)

  const setStateOption = (id: number | null) => {
    setLocation(id)
    setOpenStates(false)
  }

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
          setLocationName(currentState ? currentState.location : "Every Where")
        }
      } finally {
        setLoading(false)
      }
    }

    getPostsByLocation()
  }, [location])
  return (
    <div className="w-full flex flex-wrap gap-8">
      <div className="basis-full flex flex-col relative justify-start mb-12 md:flex-row md:justify-center">
        {states &&
          <div className="absolute left-0 w-full">
            <div onClick={() => setOpenStates(!openStates)} className="flex pl-4 gap-4 cursor-pointer">State: {locationName} <CaretDownIcon className={`${openStates ? "rotate-180" : "rotate-0"} transition`} size={32} /></div>
            <div className={`${openStates ? "block" : "hidden"} box-border overflow-hidden bg-dark p-4`}><StateSelectOption key={null} id={null} optionName={"Every Where"} updateFunction={setStateOption} />
              {states.map((state, index) => <StateSelectOption key={index} id={state.id} optionName={state.location} updateFunction={setStateOption} />)}
            </div>
          </div>
        }
        <h2 className="pageTitle mt-16">{`Events in ${locationName}`}</h2>
      </div>
      {loading ? <img src="heart.gif" alt="loading..." /> :
        <div className="flex p-4 justify-start gap-4 flex-wrap">
          {locationPosts && locationPosts.length ? locationPosts.map((post, index) =>
            <div key={index} className="basis-[calc(100%/2-16px/2)] md:basis-[calc(100%/3-32px*2/3)] flex flex-col border-1 rounded-xl overflow-hidden">
              <Post {...post} />
            </div>
          ) : <h2 className="subTitle">{`No events in ${locationName ? locationName : "every where"}. This is an opportunity to get the ball rolling!`}</h2>
          }
        </div>
      }
    </div>
  )
}

export default Posts