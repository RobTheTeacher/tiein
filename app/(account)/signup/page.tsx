
import Link from "next/link"
import SignUpForm from "./form"
import Image from 'next/image'
import About from "@/components/About"
import { getLocations } from "@/lib/supabase/queries"

const SignUpPage = async () => {
  const states = await getLocations()

  return (
    <div className="m-8">
      <About />
      <div className="m-auto max-w-[550px]">
        <h1 className="pageTitle">Sign up to</h1>
        <Link className="block mb-12" href="/">
          <Image
            className="dark:invert m-auto mt-8"
            src="/tie-in-logo.gif"
            alt="tie in logo"
            width={800}
            height={500}
            priority
          />
        </Link>
        <SignUpForm locations={states} />
        <p className="text-center mb-4">Already have an account?</p>
        <Link href="/login" className="block text-center text-yellow">Log In</Link>
      </div>
    </div>
  )
}

export default SignUpPage