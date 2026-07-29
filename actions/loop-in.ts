'use server'
import { createClient } from "@/utils/supabase/serverClient"

export const LoopIn = async ({ user, post }: { user: string, post: number }) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("loops")
    .insert({user: user, post: post})

  console.log(data, error)
}