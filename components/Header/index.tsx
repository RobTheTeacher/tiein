import Link from 'next/link'
import AccountLinks from "./accountLinks"
import { createClient } from "@/lib/supabase/serverClient"
import Title from '../Title'

const Header = async ({ children }: { children: React.ReactNode }) => {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="relative flex flex-wrap justify-between w-full md:p-4">
      <div className="sticky self-start top-0 bg-blue basis-3/5 p-4 order-1 z-10 md:static  md:basis-1/5">
        <Title />
      </div>
      <div className="order-3 md:order-2 md:basis-3/5 p-4 md:mt-16 bg-faded-dark-blue">
        {children}
      </div>
      <div className="top-0 flex items-center p-4 justify-end md:items-start md:pt-8 md:self-start basis-2/5 sticky bg-blue order-2 z-10 md:basis-1/5 md:order-3">
        <AccountLinks loggedIn={user ? true : false} />
      </div>
    </div>
  )
}

export default Header