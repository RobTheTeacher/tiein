'use client'
import { ArrowRight } from "lucide-react"
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { LogIn } from "@/actions/login"
import { LogInSchema } from '@/actions/schemas'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ErrorMessage from "@/components/ErrorMessage"
import TieInButton from "../tieInButton"


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
      <form onSubmit={handleSubmit(values => mutate(values))} className="flex flex-col w-full max-w-[400px]">
        <input className="textInput" {...register("email")} placeholder="Email" />
        {errors.email && <ErrorMessage message={errors.email.message!} />}
        <input className="textInput" type="password" {...register("password")} placeholder="Password" />
        {errors.password && <ErrorMessage message={errors.password.message!} />}
        <div className="flex justify-between mt-2">
          <Link href="/reset" className="opacity-75 link">Forgot password?</Link>
          <Link href="/signup" className="underline opacity-75 link">Sign up</Link>
        </div>
        <TieInButton />
      </form>
      {serverError && <p className="text-center mb-2 text-orange">{serverError}</p>}
    </>
  )
}

export default LogInForm