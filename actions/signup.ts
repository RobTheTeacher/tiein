'use server'
import { createClient } from "@/lib/supabase/serverClient"
import { SignUpSchema } from "./schemas"
import z from "zod"
import { redirect } from "next/navigation"

export const SignUp = async (userdata: z.infer<typeof SignUpSchema>) => {
  const supabase = await createClient()
  const parsedData = SignUpSchema.parse(userdata)

  const { data: { user }, error } = await supabase.auth.signUp({
    email: parsedData.email,
    password: parsedData.password,
    options: {
      data: {
        display_name: parsedData.username
      }
    }
  })

  if (!user) {
    console.log(error?.message)
    return error?.message === "User already registered" ? {message: "Email already registered"} : {message: error?.message}
  }



  if (user && user.email) {

    const { data, error } = await supabase
      .from("users")
      .insert([{ id: user.id, email: user.email, username: user.user_metadata.display_name, state: parsedData.state }])

    //  if (error && error.code === "23505") throw new Error("Username is taken, choose another!")

    if (!data) {
      console.log("NO user")
      return { message: 'Username error' }
    }
  }

  redirect("/")
}