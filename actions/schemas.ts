import z from "zod";

export const SignUpSchema = z.object({
  email:z.email(),
  username: z.string().min(6, "You need at least 6 characters in your username"),
  password: z.string().min(6, "You need a minimum of 6 characters in your password")

})