import LogInButton from '@/app/(account)/login/button';
import SignUpButton from '@/app/(account)/signup/button';
import { createClient } from '@/utils/supabase/serverClient';
import MobileMenu from './mobileMenu';

const AccountLinks = async () => {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser();
  return (
    <>
      {user &&
        <MobileMenu name={user.user_metadata.display_name} id={user.id} />
      }
      {!user &&

        <div className="flex flex-col gap-4 p-4 md:flex-row">
          <LogInButton />
          <SignUpButton />
        </div>
      }
    </>
  )
}

export default AccountLinks