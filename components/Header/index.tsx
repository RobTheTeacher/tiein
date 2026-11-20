import Link from 'next/link'
import AccountLinks from "./accountLinks"
import { createClient } from "@/lib/supabase/serverClient"

const Header = async ({ children }: { children: React.ReactNode }) => {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="relative flex flex-wrap justify-between w-full md:p-4">
      <Link className="order-1 p-4 pr-0 md:basis-1/5" href="/">
        <h2 className="font-heading text-dark-blue text-8xl">Tie In</h2>
      </Link>
      <div className="order-3 md:order-2 md:basis-3/5 p-4 md:mt-16 bg-faded-dark-blue">
        {children}
      </div>
      <div className="order-2 p-4 md:basis-1/5 md:order-3">
        <AccountLinks loggedIn={user ? true : false} />
      </div>
    </div>
  )
}

export default Header