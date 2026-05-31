
import { createClient } from "@/utils/supabase/serverClient"
import ResetPasswordForm from "./reset-password-form"
import Link from "next/link";
import Image from "next/image"

const ResetPage = async ({searchParams}:{searchParams: Promise<{[code: string]: string}>}) => {

  const {code} = await searchParams;

  const supabase = await createClient()
  
  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code!)
    console.log("Session data", data)
    console.log("Session error", error)
    console.log("User:: ", data.session?.user)
  }
  return (
    <div> 
      <div className="flex justify-end">
        <Link className="" href="/about">Learn more about Tie In &#8594;</Link>
        
      </div>
      <Link className="block my-12" href="/">
          <Image
            className="dark:invert m-auto mt-8"
            src="/logo.png"
            alt="Tie in logo"
            width={300}
            height={300}
            priority
          />
        </Link>
      Reset password here

    {code &&  <ResetPasswordForm />}
    </div>
  )
}

export default ResetPage