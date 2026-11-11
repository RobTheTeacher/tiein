'use client'

import { CreatePost } from "@/actions/create-post"
import { PostWithImageSchema } from "@/actions/schemas"
import ErrorMessage from "@/components/ErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"
import { CalendarIcon } from "lucide-react";
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
          <div className="w-full flex md:justify-between g-4 md:basis-2/5 md:grow">
            <Controller
              name="date"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>When {field.value ? format(field.value, "PPP") : 'is the event?'}</FieldLabel>
                  <Popover>
                    <PopoverTrigger
                      render={
                        <Button
                          variant="outline"
                          data-empty={!field.value}
                          className="justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
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
          <div className="w-full flex md:justify-between g-4 md:basis-2/5 md:grow">
            <Controller
              name="time"
              control={control}
              render={({ field, fieldState }) =>
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