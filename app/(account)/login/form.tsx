'use client'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { LogIn } from "@/actions/login"
import { LogInSchema } from '@/actions/schemas'

const LogInForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(LogInSchema)
  })

  const { mutate, error } = useMutation({
    mutationFn: LogIn
  })

  return (
    <>
      <form onSubmit={handleSubmit(values => mutate(values))} className="flex flex-col max-w-[350px] m-auto">
        <input className="textInput" {...register("email")} placeholder="Email..." />
        {errors.email && <p>{errors.email.message}</p>}
        <input className="textInput" type="password" {...register("password")} placeholder="Shh, its a secret" />
        {errors.password && <p>{errors.password.message}</p>}
        <button type="submit" className="linkButton mt-8">Tie In &#8594;</button>
      </form>
      {error && <p className="text-white">{error.message}</p>}
    </>
  )
}

export default LogInForm