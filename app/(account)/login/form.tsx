'use client'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { LogIn } from "@/actions/login"
import { LogInSchema } from '@/actions/schemas'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const LogInForm = () => {
  const [serverError, setServerError] = useState<string | undefined>(undefined)
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(LogInSchema)
  })
  const router = useRouter()
  const { mutate } = useMutation({
    mutationFn: LogIn,
    onSuccess: (result) => {
      if (result.error) return setServerError(result.error)
      router.push("/")
      router.refresh()
    }
  })

  return (
    <>
      <form onSubmit={handleSubmit(values => mutate(values))} className="flex flex-col w-full max-w-[350px] m-auto">
        <input className="textInput" {...register("email")} placeholder="Email..." />
        {errors.email && <p>{errors.email.message}</p>}
        <input className="textInput" type="password" {...register("password")} placeholder="Shh, its a secret" />
        {errors.password && <p>{errors.password.message}</p>}
        <button type="submit" className="linkButton my-8">Tie In &#8594;</button>
      </form>
      {serverError && <p className="text-center mb-2 text-orange">{serverError}</p>}
    </>
  )
}

export default LogInForm