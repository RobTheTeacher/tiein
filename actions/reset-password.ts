'use server'

import { createClient } from "@/utils/supabase/serverClient"
import { PasswordSchema } from "./schemas"
import z from "zod"

export const ResetPassword = async (userdata: z.infer<typeof PasswordSchema>) => {
  const supabase = await createClient()

  const parsedData = PasswordSchema.parse(userdata)

  const { data, error } = await supabase.auth.updateUser({
    password: parsedData.password
  })

  if(error) console.log("error: ", error)

    if(data) console.log("data: ", data)

}