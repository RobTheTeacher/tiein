'use server'
import { createClient } from "@/utils/supabase/serverClient"
import { PostSchema } from "./schemas"
import z from "zod"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { slugify } from "@/utils/slugify"


export const CreatePost = async (userdata: z.infer<typeof PostSchema>) => {
   const supabase = await createClient()

   const {data: {user}} = await supabase.auth.getUser()
   if (!user) {throw new Error("Not authorised")}
   const parsedData = PostSchema.parse(userdata)
   const slug = slugify(parsedData.title)
   
   const {error} = await supabase.from("posts")
    .insert([{"content": parsedData.content, author: user.id, title: parsedData.title, slug: slug}])
    .single()
    .throwOnError()

  
    if(error) {
          if (error.code === 'PGRST116') {
            console.log("error in insert", error)
          } else {
            throw (error)
          }
        }

   revalidatePath("/")
   redirect(`/`)
}