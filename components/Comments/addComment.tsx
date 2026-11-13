'use client'
import { AddComment } from "@/actions/add-comment"
import { CommentSchema } from "@/actions/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { Dispatch, SetStateAction } from "react"

const AddCommentForm = ({ postId, parentId, closeReply }: { postId: number, parentId: number | null, closeReply: Dispatch<SetStateAction<any>> | null }) => {
  const handleReply = () => {
    if (closeReply) closeReply(false)
  }

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(CommentSchema)
  })

  const { mutate, error } = useMutation({
    mutationFn: AddComment,
    onSettled: () => {
      reset(),
        handleReply()
    }
  })
  
  return (
    <div className="text-lg text-white">
      <form onSubmit={handleSubmit(values => mutate({ content: values, parentId, postId }))}>
        <textarea className="textInput rounded-xl" {...register("content")} />
        <button className="secondaryButton text-yellow text-right cursor-pointer">{parentId ? 'Add Reply' : 'Add comment'}</button>
        {errors.content && <ErrorMessage message={errors.content.message!} />}
      </form>
      {error && <ErrorMessage message={error.message} />}
    </div>
  )
}

export default AddCommentForm