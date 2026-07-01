import LogOutButton from '@/app/(account)/logout';
import CreatePostButton from '@/app/(main)/ create/button';
import { createClient } from '@/utils/supabase/serverClient';
import Link from 'next/link'

const AccountLinks = async () => {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser();
  return (
    <div className="flex gap-4 x">
      {user &&
        <>
          <p>Welcome {user.user_metadata.display_name}</p>
          <LogOutButton />
          <CreatePostButton />
        </>
      }
      {!user &&
        <>
          <Link className="linkButton" href="/login">Log in</Link>
          <Link className="linkButton" href="/signup">SignUp</Link>
        </>
      }
    </div>
  )
}

export default AccountLinks