import Link from 'next/link'
import AccountLinks from "@/components/Header/accountLinks"
import { createClient } from "@/lib/supabase/serverClient"
import Title from '../Title'

const EventHeader = async ({ children }: { children: React.ReactNode }) => {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="relative flex flex-wrap justify-between w-full md:p-4">
      <div className="sticky self-start top-0 bg-blue basis-3/5 p-4 order-1 z-10 md:static md:basis-3/23">
        <Title />
      </div>
      {children}
      <div className="min-w-25 top-0 flex items-center basis-2/5 p-4 justify-end md:items-start md:pt-8 md:self-start md:basis-2/23 sticky bg-blue order-2 z-10 md:order-3">
        <AccountLinks loggedIn={user ? true : false} />
      </div>
    </div>
  )
}

export default EventHeader