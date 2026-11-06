import { getLocations, getUserLocation } from "@/utils/supabase/queries"
import CreatePostForm from "./form"
import { createClient } from "@/utils/supabase/serverClient"

const CreatePostPage = async() => {
  const supabase = await createClient()
  const {data: {user}} = await supabase.auth.getUser()
  const homeState = !user ? null : await getUserLocation(user?.id)

  const locations = await getLocations()
  return (
    <div className="p-4">
      <h1 className="text-5xl text-center mb-16">Make a thread, make some ties</h1>
      <CreatePostForm  states={locations} homeState={homeState} />
    </div>
  )

}

export default CreatePostPage