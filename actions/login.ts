'use server'

import { createClient } from "@/lib/supabase/serverClient"
import { LogInSchema } from "./schemas"
import z from "zod"


export const LogIn = async (userdata: z.infer<typeof LogInSchema>) => {
  const supabase = await createClient()
  const parsedData = LogInSchema.parse(userdata)
  const { error } = await supabase.auth.signInWithPassword({ ...parsedData })

  if (error) return {error: error.message}
  return {error: null}
}

