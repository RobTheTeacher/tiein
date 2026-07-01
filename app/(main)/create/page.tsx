'use client'

import { CreatePost } from "@/actions/create-post"
import { PostSchema } from "@/actions/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

const CreatePostPage = () => {

  const {register, handleSubmit} = useForm({
    resolver: zodResolver(PostSchema)
  })

  const {mutate, error} = useMutation({
    mutationFn: CreatePost
  })
  return (
    <div>
      <h1 className="text-5xl text-center mb-16">Make a thread, make some ties</h1>
      <form onSubmit={handleSubmit(values => mutate({content: values.content, title: values.title, slug: values.title}))}>
        <div className="flex gap-8 justify-center">
        <input className="textInput" {...register("title")} placeholder="Enter a title" ></input>
        <input className="createInput"  placeholder="Upload image/s"type="file"></input>
        <input className="createInput" {...register("content")} type="textbox" placeholder="Add a description" />
        </div>
        <button className="block my-16 mx-auto py-4 px-12 text-black rounded-2xl bg-white">Post &#8594;</button>
      </form>
      {error && <p className="text-4xl text-white">{error.message}</p>}

      <p>To Do:</p>
      <p>Slugify</p>
      <p>Image Upload</p>
      <p>Multiple Images upload</p>
      <p>Display the images</p>
      <p>WORKS WITH HARD CODED TITLE ANDD SLUG, CHECK THE SCHEMA??</p>
    </div>
  )
}

export default CreatePostPage