import { type QueryData } from "@supabase/supabase-js";
import { createClient } from "./browserClient"
import { createServerClient } from "@supabase/ssr";

export const getHomePosts = async () => {
  const supabase = createClient();
  return await supabase.from('posts')
    .select('id, title, slug, author("username", "id"), image, state, date')
    .order('created_at', { ascending: false })
}

export const getLocationPosts = async (location: number) => {
  const supabase = createClient();
  return await supabase.from('posts')
    .select('id, title, slug, author("username", "id"), image, date')
    .eq("state", location)
    .order('created_at', { ascending: false })
}

export const getSinglePost = async (slug: string) => {
  const supabase = await createClient()

  return await supabase.from("posts")
    .select('title, image, content, slug, author("username","id"), id, date, time')
    .eq('slug', slug)
    .single()
}

export const getUserName = async (profile: string):Promise<string | undefined> => {
  const supabase = await createClient()

  const {data, error} = await supabase.from("users")
    .select('username')
    .eq('id', profile)
    .single()

    if (error) throw error
    return data.username
}

export const getUserLocation = async(userId: string) => {
  const supabase = await createClient()

  const {data, error} = await supabase.from("users")
    .select('state')
    .eq('id', userId)
    .single()

    if (error) throw error
    return data.state
}

export const getUserPosts = async (profile: string) => {
  const supabase = await createClient()

  return await supabase.from("posts")
    .select('title, image, content, slug, author("username"), id')
    .eq('author', profile)
}

export const getUserTies = async (userId: string) => {
  const supabase = await createClient()
  const { data, error } = await supabase.from("ties").select('post("id", "title", "slug", "image")').eq('user_id', userId)
  if (error) throw error
  return data
}

export const getUserLoops = async (userId: string) => {
  const supabase = await createClient()
  const { data, error } = await supabase.from("loops").select('post("id", "title", "slug", "image")').eq('user_id', userId)
  if (error) throw error
  return data
}

export const checkUserTies = async (userId: string, postId: number) => {
  const supabase = await createClient()
  const { data, error } = await supabase.from("ties").select('post').eq('user_id', userId).eq('post', postId)
  if (error) throw error
  return data.length > 0 ? true : false
}

export const checkUserLoops = async (userId: string, postId: number) => {
  const supabase = await createClient()
  const { data, error } = await supabase.from("loops").select('post').eq('user_id', userId).eq('post', postId)
  if (error) throw error

  return data.length > 0 ? true : false
}

export const getLocations = async () => {
  const supabase = await createClient()
  const {data, error} = await supabase.from("locations").select().order('id')
  if (error) throw error
  return data
}

export type HomePostType = QueryData<ReturnType<typeof getHomePosts>>

