'use server'
import { createClient } from "@/lib/supabase/serverClient"

export const LoopIn = async ({ user, post }: { user: string, post: number }) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("loops")
    .insert({ user_id: user, post: post })
}

export const UnLoop = async ({ user, post }: { user: string, post: number }) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("loops")
    .delete()
    .eq("user_id", user)
    .eq("post", post)
}