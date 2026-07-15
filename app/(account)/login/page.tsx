import Link from "next/link"
import Image from "next/image"
import LogInForm from "./form"
import About from "@/components/About"

const LogInPage = () => {
  return (
    <div className="m-8">
      <About />

      <div className="pageLayout m-auto max-w-[350px] flex flex-col justify-center">
        <h1 className="pageTitle">Log in to</h1>
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
        <LogInForm />
        <Link href="/reset" className="block text-center mb-4">Forgot password?</Link>
        <Link href="/signup" className="block text-center">Sign up</Link>
      </div>
    </div>
  )
}

export default LogInPage