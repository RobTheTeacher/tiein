'use client'
import ErrorMessage from "@/components/ErrorMessage"
import { TimePicker } from "@/components/reui/time-picker"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { SelectContent } from "@/components/ui/select"
import { Tables } from "@/lib/supabase/database.types"
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"
import { ArrowRight, CalendarIcon, Delete } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { StateType } from "@/utils/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { PostWithImageSchema } from "@/actions/schemas"
import { useMutation } from "@tanstack/react-query"
import { EditPost } from "@/actions/edit-post"
import { format } from "date-fns"

const EditForm = ({ initialValues, slug, states }: { initialValues: Pick<Tables<"posts">, "title" | "content" | "image" | "state" | "date" | "time">, slug: string, states: StateType[] }) => {
  const [time, setTime] = useState<string | null>(initialValues.time)
  const [image, setImage] = useState<File | string | null>(initialValues.image)
  const [preview, setPreview] = useState<string | null>(initialValues.image)
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(PostWithImageSchema),
    defaultValues: { ...initialValues, date: new Date(initialValues.date) }
  })

  const { mutate } = useMutation({
    mutationFn: EditPost
  })

  const locations = states.map(state => ({
    value: state.id,
    label: state.location
  }))

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

  return (
    <div>
      <h1 className="pageTitle font-heading">Editing {initialValues.title}</h1>
      <form onSubmit={handleSubmit(values => {
        const imageForm = new FormData()

        if (image) {
          imageForm.append('image', image)
        }
        mutate({
          postData:
          {
            ...values,
            image: imageForm,
            time: time!
          },
          slug: slug
        })
      })}>
        <div className="flex flex-wrap gap-8 justify-center">
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
          <div className="w-full">
            <label htmlFor="title">Edit title</label>
            <input id="title" className="textInput" {...register("title")} placeholder="Title" ></input>
            {errors.title && <ErrorMessage message={errors.title.message!} />}
          </div>
          <div className="w-full">
            <label htmlFor="description">Add an optional description</label>
            <textarea id="description" className="textInput" {...register("content")} placeholder="Add a description" />
            {errors.content && <ErrorMessage message={errors.content.message!} />}
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
                          className="justify-start bg-white text-left font-normal text-dark-blue hover:text-dark-blue hover:cursor-pointer"
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
                    className="bg-white text-dark-blue hover:text-dark-blue hover:cursor-pointer pointer-events-auto"
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
        <button className="block font-bold align:right text-dark-blue cursor-pointer">Update your thread <ArrowRight className="inline" size={48} /></button>
      </form >
    </div >
  )

}

export default EditForm