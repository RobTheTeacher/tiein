import { type QueryData } from "@supabase/supabase-js";
import { createClient } from "./browserClient"

export type HomePostType = QueryData<ReturnType <typeof getHomePosts>>

export const getHomePosts = async () => {
  const supabase = createClient();
  return await supabase.from('posts')
        .select('id, title, slug, author("username"), created_at')
        .order('created_at', { ascending: false })
}