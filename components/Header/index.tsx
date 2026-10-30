import Image from "next/image"
import Link from 'next/link'
import AccountLinks from "./accountLinks"
import { createClient } from "@/utils/supabase/serverClient"
import MobileMenu from "./mobileMenu"

const Header = async() => {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser();
    
  return (
    <div className="relative flex items-center justify-apart w-full p-4 sm:text-left">
      <div className="flex-1/4">
        {user && <div className="text-3xl text-left">Welcome <Link href={`/profile/${user.id}`}>{user.user_metadata.display_name}</Link></div>}
      </div>
      <Link className="flex-2/4 flex justify-center" href="/">
        <Image
          className="dark:invert"
          src="/tie-in-logo.gif"
          alt="Tiein Logo"
          width={500}
          height={300}
          priority
        />
      </Link>
      <AccountLinks loggedIn={user ? true : false} />
    </div>
  )
}

export default Header