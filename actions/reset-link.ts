'use server'

import { createClient } from "@/utils/supabase/serverClient"
import { EmailSchema } from "./schemas"
import z from "zod"

export const ResetLink = async (userdata: z.infer<typeof EmailSchema>) => {
  const supabase = await createClient()

  const { email } = EmailSchema.parse(userdata)
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
  })

  if (error) console.log("error ", error.message)
}