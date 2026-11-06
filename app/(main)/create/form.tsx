'use client'

import { CreatePost } from "@/actions/create-post"
import { PostSchema } from "@/actions/schemas"
import ErrorMessage from "@/components/ErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"
import z from "zod"
import { CalendarIcon } from "lucide-react";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TimePicker } from "@/components/reui/time-picker"
import { useState } from "react"

type StateType = {
  created_at: string;
  id: number;
  location: string;
}

const CreatePostForm = ({ states, homeState }: { states: StateType[], homeState: number | null }) => {
  const [time, setTime] = useState<string | null>("00:00")
  const locations = states.map(state => ({
    value: state.id,
    label: state.location
  }))

  const PostWithImageSchema =
    PostSchema.omit({ image: true })
      .extend({ image: z.unknown().transform(value => { return value as (FileList) }).optional() })

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(PostWithImageSchema),
    defaultValues: {
      state: homeState!,
      time: time!
    }
  })

  const { mutate, error } = useMutation({
    mutationFn: CreatePost
  })

  return (
    <>
      <form onSubmit={handleSubmit(values => {
        const imageForm = new FormData()

        if (values.image) {
          imageForm.append('image', values.image[0])
        }

        mutate({
          content: values.content,
          title: values.title,
          image: imageForm,
          date: values.date,
          state: values.state,
          time: time!
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
          <Controller
            name="state"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="state">Where is the event?</FieldLabel>
                <Select items={locations}
                  onValueChange={field.onChange}
                  defaultValue={homeState}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {locations.map((state) => (
                        <SelectItem key={state.value} value={state.value}>
                          {state.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError className="text-[1.4rem] text-red-500" errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
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
          <div className="w-full max-w-xs">
            <Controller
              name = "time"
              control = {control}
              render = {({ field, fieldState }) =>
                <Field>
                  <FieldLabel id="time-label" htmlFor="time">
                    Event starts: {time}
                  </FieldLabel>
                  <TimePicker
                    className="bg-white text-black pointer-events-auto"
                    id="time"
                    aria-labelledby="time-label"
                    onValueChange={setTime}  
                  />
                  {fieldState.invalid && (
                    <FieldError className="text-[1.4rem] text-red-500" errors={[fieldState.error]} />
                  )}
                </Field>
              } />
          </div>
        </div>
        <button className="block my-16 mx-auto py-4 px-12 text-black rounded-2xl bg-white cursor-pointer">Post &#8594;</button>
      </form >
      {error && <p className="text-4xl text-white">{error.message}</p>}
    </>


  )
}

export default CreatePostForm