import { createClient } from "./browserClient"


export const getHomePosts = async () => {
  const supabase = createClient();
  return await supabase.from('posts')
        .select('id, title, slug, author("name"), created_at')
        .order('created_at', { ascending: false })
}