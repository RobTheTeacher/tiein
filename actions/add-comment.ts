'use server'
import { createClient } from "@/lib/supabase/serverClient"
import { CommentSchema } from "./schemas"
import z from "zod"
import { revalidatePath } from "next/cache"

export const AddComment = async ({content, parentId, postId}: {content: z.infer<typeof CommentSchema>, parentId: number | null, postId: number}) => {
  const supabase  = await createClient()
  const {data : {user}} = await supabase.auth.getUser()

  if (!user) throw new Error("Unauthorised")
  const parsedContent = CommentSchema.parse(content)

  const {data, error} = await supabase.from('comments').insert({author: user.id, parent: parentId, post: postId, content: parsedContent.content})
  if (error) throw error

  revalidatePath("/")
}