'use client'

import { CreatePost } from "@/actions/create-post"
import { PostSchema } from "@/actions/schemas"
import ErrorMessage from "@/components/ErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"
import z from "zod"
import { CalendarIcon } from "lucide-react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

const CreatePostPage = () => {
  const PostWithImageSchema =
    PostSchema.omit({ image: true })
      .extend({ image: z.unknown().transform(value => { return value as (FileList) }).optional() })

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(PostWithImageSchema)
  })

  const { mutate, error } = useMutation({
    mutationFn: CreatePost
  })

  return (
    <div className="p-4">
      <h1 className="text-5xl text-center mb-16">Make a thread, make some ties</h1>
      <form onSubmit={handleSubmit(values => {
        const imageForm = new FormData()

        if (values.image) {
          imageForm.append('image', values.image[0])
        }

        mutate({
          content: values.content,
          title: values.title,
          image: imageForm,
          date: values.date
        })
      })}>
        <div className="flex flex-wrap gap-8 justify-center">
          <div className="w-full">
            <label htmlFor="title">You need a title</label>
            <input id="title" className="textInput" {...register("title")} placeholder="Enter a title" ></input>
            {errors.title && <ErrorMessage message={errors.title.message!} />}
          </div>
          <div className="w-full">
            <label htmlFor="description">Add an optional description</label>
            <textarea id="description" className="textInput" {...register("content")} placeholder="Add a description" />
            {errors.content && <ErrorMessage message={errors.content.message!} />}
          </div>
          <div className="w-full">
            <label htmlFor="image">You can add an image if you like</label>
            <input id="image" className="textInput" {...register("image")} placeholder="Upload image/s" type="file"></input>
            {errors.image && <ErrorMessage message={errors.image.message!} />}
          </div>
          <div className="w-full flex md:justify-between g-4 md:basis-2/4 ">
            <Controller
              name="date"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="w-full">
                  <FieldLabel htmlFor="date">When is the event?</FieldLabel>
                  <InputGroup className="bg-white text-black font-bold">
                    <InputGroupInput className="p- text-[1.4rem]" onChange={(value) => field.onChange(value)} id="date" type="date" />
                    <InputGroupAddon>
                      <CalendarIcon className="w-8 pointer" aria-hidden="true" />
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError className="text-[1.4rem] text-red-500" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
        </div>
        <button className="block my-16 mx-auto py-4 px-12 text-black rounded-2xl bg-white cursor-pointer">Post &#8594;</button>
      </form >
      {error && <p className="text-4xl text-white">{error.message}</p>}

      <p>To Do:</p>
      <p>Multiple Images upload</p>
      <p>Display the images</p>
      <p>Edit page</p>
    </div >
  )
}

export default CreatePostPage