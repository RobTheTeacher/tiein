'use server'
import { createClient } from "@/lib/supabase/serverClient"
import { PostSchema } from "./schemas"
import z from "zod"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { slugify } from "@/utils/slugify"
import { uploadImage } from "@/lib/supabase/upload-image"

export const EditPost = async ({ postData, slug }: { postData: z.infer<typeof PostSchema>, slug: string }) => {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) { throw new Error("Not authorised") }
  const parsedData = PostSchema.parse(postData)

  const { data: post, error } = await supabase.from("posts").select("image").eq("id", parseInt(slug.split("-")[0])).single()
  if (!post) throw new Error("Post doesn't exist!")

  const imageFile = postData.image?.get('image')
  let imageUrl;
console.log("Post:", post.image)
  if (typeof imageFile === "string")
      imageUrl = post.image
  else if (typeof imageFile !== "undefined") {
    if (!(imageFile instanceof File) && imageFile !== null) {
      throw new Error("Malformed Image file")
    }
    imageUrl = imageFile ? await uploadImage(imageFile) : null
  } 

  await supabase.from("posts")
    .update([{ ...parsedData, image: imageUrl }])
    .eq("id", parseInt(slug.split("-")[0]))
    .single()
    .throwOnError()

  revalidatePath('/')
  redirect(`/${slug}`)
}