import z from "zod";

export const SignUpSchema = z.object({
  email: z.email(),
  username: z.string().min(6, "You need at least 6 characters in your username"),
  password: z.string().min(6, "You need a minimum of 6 characters in your password"),
  state: z.string().min(1, "Please select a state")
})

export const LogInSchema = z.object({
  email: z.email(),
  password: z.string().min(6, "You need a minimum of 6 characters in your password")
})

export const EmailSchema = z.object({
  email: z.email()
})

export const PasswordSchema = z.object({
  password: z.string().min(6, "You need a minimum of 6 characters in your password")
})

export const PostSchema = z.object({
  content: z.string().optional(),
  title: z.string().min(5, "The title must have at least 5 characters"),
  image: z.instanceof(FormData),
  date: z.date("Select a date"),
  state: z.number("Please select a state").min(1, "Please select a state"),
  time: z.string("Select a starting time")
})

export const PostWithImageSchema =
  PostSchema.omit({ image: true })
    .extend({
      image: z.unknown().transform(value => { return value as (FileList) }).optional()
})

export const CommentSchema = z.object({
  content: z.string().min(1, "You have to say something")
})
