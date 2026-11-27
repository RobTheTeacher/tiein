
import Link from "next/link"
import SignUpForm from "./form"
import About from "@/components/About"
import { getLocations } from "@/lib/supabase/queries"
import Title from "@/components/Title"

const SignUpPage = async () => {
  const states = await getLocations()

  return (
    <div className="accountPage">
      <img className="absolute top-0 right-0 -z-10 h-screen md:w-[50%]" src="/backgrounds/signup-bg.png" />
      <About />
      <div className="mt-8 md:mt-0 md:h-full flex flex-col-reverse md:flex-row w-full items-center">
        <div className="basis-2/5 flex flex-col md:items-end">
          <h1 className="text-3xl">Sign up to</h1>
          <Title />
          <SignUpForm states={states} />
        </div>
      </div>
    </div>
  )
}

export default SignUpPage