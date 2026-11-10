'use server'

import { createClient } from "@/lib/supabase/serverClient"
import { LogInSchema } from "./schemas"
import z from "zod"
import { redirect } from "next/navigation"

export const LogIn = async (userdata: z.infer<typeof LogInSchema>) => {
  const supabase = await createClient()
  const parsedData = LogInSchema.parse(userdata)
  const { data, error } = await supabase.auth.signInWithPassword({ ...parsedData })

  if (error) throw error
  redirect("/")
}

