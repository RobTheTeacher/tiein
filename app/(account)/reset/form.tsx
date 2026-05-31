'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ResetLink } from "@/actions/reset-link"
import { EmailSchema } from '@/actions/schemas'

const ResetForm = () => {
  const {handleSubmit, register, formState: { errors }} = useForm({
     resolver: zodResolver(EmailSchema)
  })


  return (
    <>
      <form onSubmit={handleSubmit(ResetLink)} className="flex flex-col max-w-[350px] m-auto">
        <label htmlFor="email">Enter your email to receive a reset password link</label>
        <input className="textInput" {...register("email")} type="email" placeholder="Email" />
        {errors.email && <p>{errors.email.message}</p>}
        <button type="submit" className="linkButton mt-8">Tie In &#8594;</button>
      </form>
    
    </>
  )
}

export default ResetForm