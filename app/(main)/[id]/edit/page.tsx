import { getLocations, getSinglePostToEdit } from "@/lib/supabase/queries"
import { createClient } from "@/lib/supabase/serverClient"
import { redirect } from "next/navigation"
import EditForm from "./form"
//import EditPageForm from "./form"

const EditPostPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params
  let pageId = parseInt(id.split("-")[0])

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data, error } = await getSinglePostToEdit(pageId)
    const locations = await getLocations()

  if (user && data && user.id !== data.author.id)
    redirect("/")
  
  return (
    <>
      {data &&
        <div className="p-4">
          <EditForm initialValues={{...data}} states={locations} slug={id} />
        </div>
      }
    </>
  )
}

export default EditPostPage