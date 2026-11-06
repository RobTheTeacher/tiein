'use server'
import { createClient } from "@/utils/supabase/serverClient"
import { PostSchema } from "./schemas"
import z from "zod"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { slugify } from "@/utils/slugify"
import { uploadImage } from "@/utils/supabase/upload-image"

export const CreatePost = async (userdata: z.infer<typeof PostSchema>) => {
   const supabase = await createClient()
   const {data: {user}} = await supabase.auth.getUser()
   if (!user) {throw new Error("Not authorised")}

   const parsedData = PostSchema.parse(userdata)
   const slug = slugify(parsedData.title)
   const imageFile = userdata.image?.get('image')

   if (!(imageFile instanceof File) && imageFile !== null && imageFile !== "undefined") {
    throw new Error("Malformed Image file")
   }

   const publicImageUrl = (imageFile && imageFile !== "undefined") ? await uploadImage(imageFile) : null

   const {error} = await supabase.from("posts")
    .insert([{...parsedData, author: user.id, image: publicImageUrl, slug: slug}])
    .single()
    .throwOnError()

    if(error) throw (error)
    
   revalidatePath('/')
   redirect(`/${slug}`)
}