'use server'
import { createClient } from "@/utils/supabase/serverClient"

export const TieIn = async ({ user, post }: { user: string, post: number }) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("ties")
    .insert({user: user, post: post})

  console.log(data, error)
}