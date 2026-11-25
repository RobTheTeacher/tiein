import { getLocations, getUserLocation } from "@/lib/supabase/queries"
import CreatePostForm from "./form"
import { createClient } from "@/lib/supabase/serverClient"
import CreatePageHeader from "./header"

const CreatePostPage = async () => {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const homeState = !user ? null : await getUserLocation(user?.id)

  const locations = await getLocations()
  return (
    <>
      <CreatePageHeader />
      <div className="p-4">
        <CreatePostForm states={locations} homeState={homeState} />
      </div>
    </>
  )
}

export default CreatePostPage