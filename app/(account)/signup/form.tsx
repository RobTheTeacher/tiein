'use client'
import { Controller, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignUp } from "@/actions/signup"
import { SignUpSchema } from '@/actions/schemas'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import TieInButton from '../tieInButton'

type StateType = {
  id: number,
  location: string
}

type ServerError = {
  type: string,
  message: string | undefined
}

const SignUpForm = ({ states }: { states: StateType[] }) => {
  const [serverError, setServerError] = useState<ServerError | undefined>(undefined)

  const locations = states.map(state => ({
    value: state.id,
    label: state.location
  }))
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(SignUpSchema),
  })
  const router = useRouter()
  const { mutate, error } = useMutation({
    mutationFn: SignUp,
    onSuccess: (result) => {
      setServerError(result ? { type: result.type, message: result.message } : undefined)
      router.push("/")
      router.refresh()
    }
  })

  return (
    <>
      <form onSubmit={handleSubmit(values => mutate(values))}
        className="flex flex-col w-full max-w-[400px]">
        <input className="textInput" {...register("email")} placeholder="Email" />
        {errors.email && <p>{errors.email.message}</p>}
        {(serverError && serverError.type === "email") && <p className="text-center mb-2 text-orange">{serverError.message}</p>}

        <input className="textInput" {...register("username")} placeholder="Username" />
        {errors.username && <p>{errors.username.message}</p>}
        {(serverError && serverError.type === "username") && <p className="text-center mb-2 text-orange">{serverError.message}</p>}

        <input className="textInput" type="password" {...register("password")} placeholder="Password" />
        {errors.password && <p>{errors.password.message}</p>}
        {locations &&
          <Controller
            name="state"
            control={control}
            defaultValue=""
            render={({ field, fieldState={error: {message: "Please choose a state"}} }) => (
              <Field className="my-4 rounded-none text-dark-blue" >
                <Select items={locations}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue className="font-bold" placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {locations.map((state) => (
                        <SelectItem key={state.value} value={state.label}>
                          {state.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError className="text-[1.4rem] text-red-500">Please select a state</FieldError>
                )}
              </Field>
            )}
          />
        }
        <TieInButton />
        <p className="my-2 opacity-75">Have an account? Sign in <Link className="line link" href="/login">here</Link></p>
      </form>
    </>
  )
}

export default SignUpForm