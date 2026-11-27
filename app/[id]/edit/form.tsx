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
    <div className="p-4 md:py-4">
      <h1 className="pageTitle font-heading">Editing {initialValues.title}</h1>
      <form className="mt-8" onSubmit={handleSubmit(values => {
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
        <div className="md:flex flex-wrap gap-16 justify-center w-full">
          <div className="w-full aspect-2/3 md:basis-[calc(50%-32px)]">
            {preview ?
              <div className="h-full w-full relative ">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
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
          <div className="w-full aspect-2/3 md:pr-16 mt-4 md:mt-0 md:basis-[calc(50%-32px)] flex flex-col">
            <div className="mt-0 w-full"><label htmlFor="title">Edit title</label>
              <input id="title" className="textInput" {...register("title")} placeholder="Title" ></input>
              {errors.title && <ErrorMessage message={errors.title.message!} />}
            </div>

            <div className="w-full flex flex-col grow">
              <label htmlFor="description">Add an optional description</label>
              <textarea id="description" className="mb-0 grow block w-full bg-white text-dark-blue px-2 py-4 my-4 cursor-pointer placeholder-dark-blue text-lg" {...register("content")} placeholder="Add a description" />
              {errors.content && <ErrorMessage message={errors.content.message!} />}
            </div>
          </div>
          <div className="w-full flex flex-col mt-4 md:flex-row md:px-32 gap-4">
            <div className="flex gap-8 basis-[calc((100%/3)-8px)]">
              <Controller
                name="state"
                control={control}
                render={({ field, fieldState }) => (
                  <Field>
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
            </div>
            <div className="basis-[calc((100%/3)-8px)] flex md:justify-between g-4">
              <Controller
                name="date"
                control={control}
                render={({ field, fieldState }) => (
                  <Field>
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
            <div className="basis-[calc((100%/3)-8px)] flex md:justify-between g-4">
              <Controller
                name="time"
                control={control}
                render={({ field, fieldState }) =>
                  <Field>
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
        </div>
        <button className="pt-8 pr-4 w-full block font-bold text-right text-dark-blue cursor-pointer">Update your thread <ArrowRight className="inline" size={48} /></button>

      </form >
    </div >
  )

}

export default EditForm