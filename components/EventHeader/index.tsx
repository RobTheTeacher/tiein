import Link from 'next/link'
import AccountLinks from "@/components/Header/accountLinks"
import { createClient } from "@/lib/supabase/serverClient"

const EventHeader = async ({ children }: { children: React.ReactNode }) => {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="relative flex flex-wrap justify-between w-full md:p-4">
      <Link className="order-1 p-4 pr-0 md:basis-3/23" href="/">
        <h2 className="font-heading text-dark-blue text-8xl">Tie In</h2>
      </Link>
      {children}
      <div className="order-2 p-4 w-25 md:order-3">
        <AccountLinks loggedIn={user ? true : false} />
      </div>
    </div>
  )
}

export default EventHeader