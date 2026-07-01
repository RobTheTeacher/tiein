import Link from "next/link"
import Image from "next/image"
import LogInForm from "./form"

const LogInPage = () => {
  return (
    <div className="m-8">
      <div className="flex justify-end">
        <Link className="" href="/about">Learn more about Tie In &#8594;</Link>
      </div>

      <div className="pageLayout">
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
        <Link href="/reset">Forgot password?</Link>
        <Link href="/signup">Sign up</Link>
      </div>
    </div>
  )
}

export default LogInPage