import Link from "next/link"
import SignUpForm from "./form"
import Image from 'next/image'
import About from "@/components/About"

const SignUpPage = () => {
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
        <SignUpForm />
        <p className="text-center mb-4">Already have an account?</p>
        <Link href="/login" className="block text-center">Log In</Link>
      </div>
    </div>
  )
}

export default SignUpPage