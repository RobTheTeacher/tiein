'use client'

import { CreatePost } from "@/actions/create-post"
import { PostWithImageSchema } from "@/actions/schemas"
import ErrorMessage from "@/components/ErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"
import { ArrowRight, CalendarIcon, Delete } from "lucide-react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
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
import { StateType } from "@/utils/types"
import { format } from "date-fns"

const CreatePostForm = ({ states, homeState }: { states: StateType[], homeState: number | null }) => {
  const [time, setTime] = useState<string | null>("00:00")
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = (e: { target: { files: FileList | null } }) => {
    if (e.target.files) {
      const file = e.target.files[0]
      if (file) {
        setImage(file)
        setPreview(URL.createObjectURL(file));
      }
    }
  }

  const removeImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
      setImage(null)
      setPreview(null)
    }
  }

  const locations = states.map(state => ({
    value: state.id,
    label: state.location
  }))

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
      <form className="md:min-w-[650px] md:w-[50%] md:ml-[10vw] md:mt-25" onSubmit={handleSubmit(values => {
        const imageForm = new FormData()

        if (image) {
          imageForm.append('image', image)
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
        <div className="md:flex flex-wrap gap-16 justify-center w-full">
          <div className="md:flex gap-16 justify-center  md:h-75">
            <div className="w-full aspect-square md:h-75 md:w-75 md:basis-[calc(50%-32px)]">
              {preview ?
                <div className="mt-2 h-full w-full relative ">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-auto"
                  />
                  <div className="absolute top-0 right-0 h-10 w-10 bg-faded-dark-blue flex justify-center items-center">
                    <Delete size={32} onClick={removeImage} />
                  </div>
                </div>
                :
                <div className="w-full h-full bg-white">
                  <label htmlFor="image" className="w-full h-full flex justify-center items-center text-dark-blue font-bold">Choose Image</label>
                  <input id="image" type="file" className="opacity-0 h-0 w-0" {...register("image")} onChange={handleFileChange}></input>
                  {errors.image && <ErrorMessage message={errors.image.message!} />}
                </div>
              }
            </div>
            <div className="w-full mt-4 md:mt-0 md:basis-[calc(50%-32px)] md:flex flex-col h-full">
              <div className="mt-0">
                <input id="title" className="mt-0 block w-full bg-white text-black font-bold px-2 py-4 my-4 cursor-pointer placeholder-dark-blue" {...register("title")} placeholder="Event Title" ></input>
                {errors.title && <ErrorMessage message={errors.title.message!} />}
              </div>
              <textarea id="description" className="mb-0 grow block w-full bg-white text-black font-bold px-2 py-4 my-4 cursor-pointer placeholder-dark-blue" {...register("content")} placeholder="Event description (optional)" />
              {errors.content && <ErrorMessage message={errors.content.message!} />}

            </div>
          </div>
        </div>
        <div className="w-full md:flex gap-4 px-2 py-4">
          <div className="flex gap-8 basis-[calc((100%/3)-8px)]">
            <Controller
              name="state"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="state">Location</FieldLabel>
                  <Select items={locations}
                    onValueChange={field.onChange}
                    defaultValue={homeState}>
                    <SelectTrigger className="w-45 p-1 pl-4 text-dark-blue text-sm">
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
          </div>
          <div className="basis-[calc((100%/3)-8px)] flex md:justify-between g-4">
            <Controller
              name="date"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Date</FieldLabel>
                  <Popover>
                    <PopoverTrigger
                      render={
                        <Button
                          variant="outline"
                          data-empty={!field.value}
                          className="justify-start text-left bg-white font-normal text-dark-blue hover:text-dark-blue hover:cursor-pointer"
                        />
                      }
                    >
                      <CalendarIcon />
                      {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                    </PopoverTrigger>
                    {fieldState.invalid && (
                      <FieldError className="text-[1.4rem] text-red-500" errors={[fieldState.error]} />
                    )}
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={field.value} onDayClick={field.onChange} />
                    </PopoverContent>
                  </Popover>
                </Field>
              )}
            />
          </div>
          <div className="basis-[calc((100%/3)-8px)] flex md:justify-between g-4">
            <Controller
              name="time"
              control={control}
              render={({ field, fieldState }) =>
                <Field>
                  <FieldLabel id="time-label" htmlFor="time">
                    Start: {time}
                  </FieldLabel>
                  <TimePicker
                    className="bg-white text-dark-blue hover:text-dark-blue hover:cursor-pointer pointer-events-auto"
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
        <div className="flex justify-end">
        <button className="block font-bold align:right text-dark-blue cursor-pointer">Share your thread <ArrowRight className="inline" size={48} /></button>
        </div>
      </form >
      {error && <p className="text-4xl text-white">{error.message}</p>
      }
    </>


  )
}

export default CreatePostForm