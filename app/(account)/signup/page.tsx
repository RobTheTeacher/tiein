import Link from "next/link"
import SignUpForm from "./form"
import Image from 'next/image'

const SignUpPage = () => {
  return (
    <div className="m-8">
      <div className="flex justify-end">
        <Link className="" href="/about">Learn more about Tie In &#8594;</Link>
      </div>
      <div className="m-auto my-12 max-w-3xl">
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
      </div>
    </div>
  )
}

export default SignUpPage