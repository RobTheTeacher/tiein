import { type QueryData } from "@supabase/supabase-js";
import { createClient } from "./browserClient"
import { createServerClient } from "@supabase/ssr";

export type HomePostType = QueryData<ReturnType <typeof getHomePosts>>

export const getHomePosts = async () => {
  const supabase = createClient();
  return await supabase.from('posts')
        .select('id, title, slug, author("username", "id"), image')
        .order('created_at', { ascending: false })
}

export const getSinglePost = async (slug: string) => {
  const supabase = await createClient()

  return await supabase.from("posts")
    .select('title, image, content, slug, author("username","id"), id')
    .eq('slug', slug)
    .single()
}

export const getUserPosts = async (profile: string) => {
  const supabase = await createClient()

  return await supabase.from("posts")
    .select('title, image, content, slug, author("username"), id')
    .eq('author', profile)
}