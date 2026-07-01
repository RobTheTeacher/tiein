'use server'
import { createClient } from "@/utils/supabase/serverClient"
import { PostSchema } from "./schemas"
import z from "zod"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"


export const CreatePost = async (userdata: z.infer<typeof PostSchema>) => {
   const supabase = await createClient()

   const {data: {user}} = await supabase.auth.getUser()
   if (!user) {throw new Error("Not authorised")}

   const parsedData = PostSchema.parse(userdata)
   const {error} = await supabase.from("posts")
   .insert([{"content":parsedData.content, author:user.id, title: "haha", slug: "wewe"}])
   if(error) console.log(error)

   revalidatePath("/")
   redirect(`/wewe`)
}