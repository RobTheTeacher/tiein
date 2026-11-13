'use server'
import { createClient } from "@/lib/supabase/serverClient"
import { revalidatePath } from "next/cache"

export const DeleteComment = async (commentId: number) => {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authorised")

  await supabase.from('comments').delete().eq("id", commentId).throwOnError()

  revalidatePath("/")
}