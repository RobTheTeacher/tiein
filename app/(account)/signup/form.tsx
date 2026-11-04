'use client'
import { useForm, Controller } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignUp } from "@/actions/signup"
import { SignUpSchema } from '@/actions/schemas'
import Select from 'react-select'
import { useState } from 'react'

type StateType = {
  id: number,
  location: string
}

const SignUpForm = ({ locations }: { locations: StateType[] }) => {
  const [selectedValue, setSelectedValue] = useState<number | null>(null)
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(SignUpSchema),
  })

  const { mutate, error } = useMutation({
    mutationFn: SignUp
  })

  const stateOptions = locations.map(state => ({
    value: state.id,
    label: state.location
  }))
  const handleChange = (option:number) => {
        setSelectedValue(option);
    };


  return (
    <>
      <form onSubmit={handleSubmit(values => mutate(values))}
        className="flex flex-col max-w-[350px] m-auto mb-8">
        <input className="textInput" {...register("email")} placeholder="Email" />
        {errors.email && <p>{errors.email.message}</p>}
        <input className="textInput" {...register("username")} placeholder="Username" />
        {errors.username && <p>{errors.username.message}</p>}
        <input className="textInput" type="password" {...register("password")} placeholder="Password" />
        {errors.password && <p>{errors.password.message}</p>}
        {error && <p className="text-center mb-2 text-orange">{error.message}</p>}
        {locations &&
          <>
            <select {...register('state')}  defaultValue=''
            className='rounded-lg border border-text-primary/20 bg-background px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-one'>
            <option value='' disabled>
            choose state
            </option>
            {locations?.map(state => (
              <option key={state.id} value={state.id}>
                {state.location}
              </option>
            ))}
          </select>
            {errors.state && <p>{errors.state.message}</p>}
          </>
        }
        <button type="submit" className="linkButton mt-8">Tie In &#8594;</button>
      </form>
    </>
  )
}

export default SignUpForm