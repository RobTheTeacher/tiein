'use client'
import ErrorMessage from "@/components/ErrorMessage"
import { TimePicker } from "@/components/reui/time-picker"
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group"
import { SelectContent } from "@/components/ui/select"
import { Tables } from "@/lib/supabase/database.types"
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

import {
  Select,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { StateType } from "@/utils/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { PostWithImageSchema } from "@/actions/schemas"
import { useMutation } from "@tanstack/react-query"
import { EditPost } from "@/actions/edit-post"

const EditForm = ({ initialValues, slug, states }: { initialValues: Pick<Tables<"posts">, "title" | "content" | "image" | "state" | "date" | "time">, slug: string, states: StateType[] }) => {
  const [time, setTime] = useState<string | null>(initialValues.time)
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(PostWithImageSchema),
    defaultValues: { ...initialValues }
  })

  const { mutate } = useMutation({
    mutationFn: EditPost
  })

  const locations = states.map(state => ({
    value: state.id,
    label: state.location
  }))

  return (
    <div>
      <h1 className="pageTitle">Editing {initialValues.title}</h1>
      <form onSubmit={handleSubmit(values => {
        const imageForm = new FormData()

        if (values.image) {
          imageForm.append('image', values.image[0])
        }
        mutate({ 
          postData: 
          {...values, 
            image: imageForm, 
            time: time!
          },
          slug: slug
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
            {initialValues.image && <img className="mb-4" src={initialValues.image} alt={initialValues.image} />}
            <label htmlFor="image">{initialValues.image ? "You can change the image if you like" : "You can add an image if you like"}</label>
            <input id="image" className="textInput" {...register("image")} placeholder="Upload image" type="file"></input>
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
                  defaultValue={initialValues.state}>
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
                <Field data-invalid={fieldState.invalid} className="w-full">
                  <FieldLabel htmlFor="date">When is the event?</FieldLabel>
                  <InputGroup className="bg-white text-black font-bold">
                    <InputGroupInput className="p- text-[1.4rem]" defaultValue={initialValues.date!} onChange={(value) => field.onChange(value)} id="date" type="date" />
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
                    defaultValue={initialValues.time}
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
    </div >
  )

}

export default EditForm