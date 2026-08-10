'use client'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignUp } from "@/actions/signup"
import { SignUpSchema } from '@/actions/schemas'
import { type Database } from '@/utils/supabase/database.types'

const SignUpForm = ({ states }: { states: Database['public']['Tables']['locations']['Row'][] }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(SignUpSchema)
  })

  const { mutate, error } = useMutation({
    mutationFn: SignUp
  })

  return (
    <>
      <form onSubmit={handleSubmit(values => mutate(values))} className="flex flex-col max-w-[350px] m-auto mb-8">
        <input className="textInput" {...register("email")} placeholder="Email" />
        {errors.email && <p>{errors.email.message}</p>}
        <input className="textInput" {...register("username")} placeholder="Username" />
        {errors.username && <p>{errors.username.message}</p>}
        <input className="textInput" type="password" {...register("password")} placeholder="Password" />
        {errors.password && <p>{errors.password.message}</p>}
        {error && <p className="text-red-400 text-center">{error.message}</p>}
        {states &&
          <div>
            <p>Select your state</p>
            <select {...register("state")}>
              {states.map(state => <option key={state.id} value={state.id}>{state.location}</option>)}
            </select>
            {errors.state && <p>{errors.state.message}</p>}
          </div>
        }
        <button type="submit" className="linkButton mt-8">Tie In &#8594;</button>
      </form>
    </>
  )
}

export default SignUpForm