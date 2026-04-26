'use client'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignUp } from "@/actions/signup"
import { SignUpSchema } from '@/actions/schemas'

const SignUpForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(SignUpSchema)
  })

  const { mutate, error } = useMutation({
    mutationFn: SignUp
  })

  return (
    <>
      <form onSubmit={handleSubmit(values => mutate(values))} className="flex flex-col">
        <label htmlFor="email">You need an email to sign up!</label>
        <input className="textInput" {...register("email")} placeholder="Email..." />
        {errors.email && <p>{errors.email.message}</p>}
        <label htmlFor="username">Create a username - we'll tell you if it's already been taken</label>
        <input className="textInput" {...register("username")} placeholder="Who are you?" />
        {errors.username && <p>{errors.username.message}</p>}

        <label htmlFor="password">And you'll need a password
        </label>
        <input className="textInput" type="password" {...register("password")} placeholder="Shh, its a secret" />
        {errors.password && <p>{errors.password.message}</p>}

        <button type="submit" className="accountLink">Join Us!</button>
      </form>
      {error && <p className="text-white">{error.message}</p>}
    </>
  )
}

export default SignUpForm