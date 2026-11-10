import Link from 'next/link'
import AccountLinks from "./accountLinks"
import { createClient } from "@/lib/supabase/serverClient"

const Header = async () => {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="relative flex flex-wrap items-center justify-apart w-full p-4 sm:text-left">
      <div className="order-4 basis-full md:order-1 md:basis-1/4">
        {user && <div className="text-3xl text-center my-4 md.text-left">Welcome <Link href={`/profile/${user.id}`}>{user.user_metadata.display_name}</Link></div>}
      </div>
      <Link className="flex-2/4 flex justify-center order-2" href="/">
        <img
          className="dark:invert"
          src="/tie-in-logo.gif"
          alt="Tiein Logo"
          width={500}
          height={300} />
      </Link>
      <AccountLinks loggedIn={user ? true : false} />
    </div>
  )
}

export default Header