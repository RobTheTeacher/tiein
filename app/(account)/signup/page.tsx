import Link from "next/link"
import SignUpForm from "./form"
import Image from 'next/image'
import About from "@/components/About"
import { getLocations } from "@/utils/supabase/queries"

const SignUpPage = async () => {
  const states  = await getLocations()
  console.log(states[1])
  
  return (
    <div className="m-8">
      <About />
      <div className="m-auto max-w-3xl">
        <h1 className="pageTitle">Sign up to</h1>
        <Link className="block my-12" href="/">
          <Image
            className="dark:invert m-auto mt-8"
            src="/logo.png"
            alt="tie in logo"
            width={300}
            height={300}
            priority
          />
        </Link>
        <SignUpForm states={states} />
        <p className="text-center mb-4">Already have an account?</p>
        <Link href="/login" className="block text-center">Log In</Link>
      </div>
    </div>
  )
}

export default SignUpPage