import Link from "next/link"
import Image from "next/image"
import LogInForm from "./form"
import About from "@/components/About"

const LogInPage = () => {
  return (
    <div className="m-8">
      <About />

      <div className="pageLayout m-auto max-w-[550px] flex flex-col justify-center">
        <h1 className="pageTitle">Log in to</h1>
        <Link className="block mb-12" href="/">
          <Image
            className="dark:invert m-auto mt-8"
            src="/tie-in-logo.gif"
            alt="Tie in logo"
            width={800}
            height={500}
            priority
          />
        </Link>
        <LogInForm />
        <Link href="/reset" className="block text-center mb-4">Forgot password?</Link>
        <Link href="/signup" className="block text-center text-yellow">Sign up</Link>
      </div>
    </div>
  )
}

export default LogInPage