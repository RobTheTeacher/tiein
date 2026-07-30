'use server'
import { createClient } from "@/utils/supabase/serverClient"
import { revalidatePath } from "next/cache"

export const TieIn = async ({ user, post }: { user: string, post: number }) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("ties")
    .insert({user_id: user, post: post})
    .single()
}

export const UnTie = async ({ user, post }: { user: string, post: number }) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("ties")
    .delete()
    .eq("user_id", user)
    .eq("post", post)

    revalidatePath("/")
}