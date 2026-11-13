'use server'
import { createClient } from "@/lib/supabase/serverClient"
import { CommentSchema } from "./schemas"
import z from "zod"
import { revalidatePath } from "next/cache"

export const AddReply = async ({content, postId, parent}: {content: z.infer<typeof CommentSchema>, postId: number, parent: number}) => {
  const supabase  = await createClient()
  const {data : {user}} = await supabase.auth.getUser()

  if (!user) throw new Error("Unauthorised")

  const parsedContent = CommentSchema.parse(content)

  const {data, error} = await supabase.from('comments').insert({author: user.id, post: postId, content: parsedContent.content, parent})
  if (error) throw error

  revalidatePath("/")
}