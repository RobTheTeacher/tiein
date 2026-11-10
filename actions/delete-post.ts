'use server'

import { createClient } from "@/lib/supabase/serverClient"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const DeleteAction = async (postId: number) => {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) { throw new Error("Not authorised") }

  const {error} = await supabase.from("posts").delete().eq("id", postId)
  if (error) console.log(error)

  revalidatePath("/")
  redirect("/")
}