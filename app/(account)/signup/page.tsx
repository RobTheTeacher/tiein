
import Link from "next/link"
import SignUpForm from "./form"
import Image from 'next/image'
import About from "@/components/About"
import { getLocations } from "@/lib/supabase/queries"
import Title from "@/components/Title"

const SignUpPage = async () => {
  const states = await getLocations()

  return (
    <div className="m-8">
      <About />
      <div className="flex flex-col-reverse md:flex-row w-full items-center justify-end">
        <div className="basis-2/5 flex flex-col items-end">
          <div>
            <div className="text-3xl self-start">Sign up to</div>
            <Title />
            <SignUpForm states={states} />
          </div>
        </div>
        <Link href="/" className="basis-3/5 max-w-3/5">
          <img src="/cropped-tie-in.gif" alt="tie in" />
        </Link>
      </div>
    </div>
  )
}

export default SignUpPage