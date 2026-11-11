'use client'

import { getHomePosts, getUserLocation, HomePostType, getLocationPosts, getLocations } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/browserClient";
import { useEffect, useState } from "react";
import Post from "./Post";
import StateSelectOption from "../StateSelect";
import { CaretDownIcon } from "@phosphor-icons/react";
import { StateType } from "@/utils/types";
import { format } from "date-fns"
import TodaysPosts from "./TodaysEvents";
import UpcomingEvents from "./UpcomingEvents";
import PastEvents from "./PastEvents";

const Posts = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [location, setLocation] = useState<number | null>(null)
  const [posts, setPosts] = useState<HomePostType | null>(null)
  const [todaysPosts, setTodaysPosts] = useState<HomePostType | null>(null)
  const [locationPosts, setLocationPosts] = useState<HomePostType | null>(null)
  const [upcomingPosts, setUpcomingPosts] = useState<HomePostType | null>(null)
  const [pastPosts, setPastPosts] = useState<HomePostType | null>(null)
  const [states, setStates] = useState<StateType[] | null>(null)
  const [locationName, setLocationName] = useState<string | null>("Every Where")
  const [openStates, setOpenStates] = useState<boolean>(false)
  const currentTimestamp = new Date();
  const currentDate = format(currentTimestamp, "PPP");

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
          const statePosts = location ? data!.filter(item => item.state === location) : data
          setTodaysPosts(statePosts.filter(item => format(item.date, "PPP") === currentDate))
          setUpcomingPosts(statePosts.filter(item => new Date(item.date).getTime() > currentTimestamp.getTime()))
          setPastPosts(statePosts.filter(item => format(item.date, "PPP") !== currentDate && new Date(item.date).getTime() < currentTimestamp.getTime()))
          setLocationPosts(statePosts.filter(item => format(item.date, "PPP") !== currentDate))
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
    <div className="w-full flex flex-wrap">
      <div className="basis-full flex flex-col relative justify-start mb-12 md:flex-row md:justify-center">
        {states &&
          <div className="absolute left-0 w-full">
            <div onClick={() => setOpenStates(!openStates)} className="flex pl-4 gap-4 cursor-pointer">State: {locationName} <CaretDownIcon className={`${openStates ? "rotate-180" : "rotate-0"} transition`} size={32} /></div>
            <div className={`${openStates ? "block" : "hidden"} box-border overflow-hidden bg-dark p-4`}><StateSelectOption key={null} id={null} optionName={"Every Where"} updateFunction={setStateOption} />
              {states.map((state, index) => <StateSelectOption key={index} id={state.id} optionName={state.location} updateFunction={setStateOption} />)}
            </div>
          </div>
        }
        <h2 className="pageTitle mt-16 mb-0">{`Events in ${locationName}`}</h2>
      </div>
      {loading ? <img src="heart.gif" alt="loading..." /> :
        <div>
          <TodaysPosts posts={todaysPosts} />
          <UpcomingEvents posts={upcomingPosts} location={locationName} />
          <PastEvents posts={pastPosts} location={locationName} />
        </div>
      }
    </div>
  )
}

export default Posts