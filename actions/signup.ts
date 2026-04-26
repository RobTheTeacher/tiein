'use server'
import { createClient } from "@/utils/supabase/serverClient"
import { SignUpSchema } from "./schemas"
import z from "zod"
import { redirect } from "next/navigation"

export const SignUp = async (userdata: z.infer<typeof SignUpSchema>) => {
  const supabase = await createClient()

  const parsedData = SignUpSchema.parse(userdata)

  const { data: { user }, error } = await supabase.auth.signUp(parsedData)
  if (error) throw new Error(error.message)


  if (user && user.email) {
    const { data, error } = await supabase
      .from("users")
      .insert([{ id: user.id, email: user.email, username: userdata.username }])

    console.log("Data: ", data, "Error is here: ", error)
     if (error && error.code==="23505") throw new Error("Username is taken, choose another!")
  }

  redirect("/")

}