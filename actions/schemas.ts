import z from "zod";

export const SignUpSchema = z.object({
  email:z.email(),
  username: z.string().min(6, "You need at least 6 characters in your username"),
  password: z.string().min(6, "You need a minimum of 6 characters in your password")
})

export const LogInSchema = z.object({
  email:z.email(),
  password: z.string().min(6, "You need a minimum of 6 characters in your password")
})

export const EmailSchema = z.object({
  email: z.email()
})

export const PasswordSchema = z.object({
  password: z.string().min(6, "You need a minimum of 6 characters in your password")
})

export const PostSchema = z.object({
  content: z.string(),
  title: z.string(),
  slug: z.string()
})