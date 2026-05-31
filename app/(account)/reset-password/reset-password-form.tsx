'use client'
import { ResetPassword } from "@/actions/reset-password"
import { PasswordSchema } from "@/actions/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

const ResetPasswordForm = () => {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(PasswordSchema)
  })

  const { mutate, error } = useMutation({
    mutationFn: ResetPassword
  })

  return (
    <form onSubmit={handleSubmit(values => mutate(values))} className="flex flex-col max-w-[350px] m-auto">
      <label> Enter new password</ label>
      <input type="password" {...register("password")} className="textInput"></input>
      {errors.password && <p>{errors.password.message}</p>}
      <button type="submit" className="linkButton mt-8">Tie In &#8594;</button>

    </form>
  )
}

export default ResetPasswordForm
