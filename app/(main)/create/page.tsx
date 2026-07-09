'use client'

import { CreatePost } from "@/actions/create-post"
import { PostSchema } from "@/actions/schemas"
import ErrorMessage from "@/components/ErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import z from "zod"

const CreatePostPage = () => {
  const PostWithImageSchema =
    PostSchema.omit({ image: true })
      .extend({ image: z.unknown().transform(value => { return value as (FileList) }).optional() })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(PostWithImageSchema)
  })

  const { mutate, error } = useMutation({
    mutationFn: CreatePost
  })

  const imageChange = (e:any) => {
    var fileInput = e.target;
console.log(typeof fileInput)
let x = fileInput.files;
    for (var i = 0; i < x.length; i++) {
      console.log(x[i].name, x.length);
    }
  }

  return (
    <div>
      <h1 className="text-5xl text-center mb-16">Make a thread, make some ties</h1>
      <form onSubmit={handleSubmit(values => {
        const imageForm = new FormData()

        if (values.image) {
          imageForm.append('image', values.image[0])
        }
        mutate({
          content: values.content,
          title: values.title,
          image: imageForm
        })
      })}>
        <div className="flex flex-wrap gap-8 max-w-[calc(50vw+32px)] m-auto justify-center">
          <div className="basis-[100%]">
            <input className="textInput w-full" {...register("title")} placeholder="Enter a title" ></input>
            {errors.title && <ErrorMessage message={errors.title.message!} />}
          </div>
          <div>
            <input className="createInput" {...register("image", { onChange: imageChange })} placeholder="Upload image/s" type="file" multiple></input>
            {errors.image && <ErrorMessage message={errors.image.message!} />}
          </div>
          <div>
            <input className="createInput" {...register("content")} type="textbox" placeholder="Add a description" />
            {errors.content && <ErrorMessage message={errors.content.message!} />}
          </div>
        </div>
        <button className="block my-16 mx-auto py-4 px-12 text-black rounded-2xl bg-white">Post &#8594;</button>
      </form>
      {error && <p className="text-4xl text-white">{error.message}</p>}

      <p>To Do:</p>
      <p>Multiple Images upload</p>
      <p>Display the images</p>
      <p>WORKS WITH HARD CODED TITLE AND SLUG, CHECK THE SCHEMA??</p>
    </div>
  )
}

export default CreatePostPage