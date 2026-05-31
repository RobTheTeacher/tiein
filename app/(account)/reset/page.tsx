import Link from "next/link"
import Image from "next/image"
import ResetForm from "./form"

const RequestResetPage = () => {
  return (
    <div className="m-8">
      <div className="flex justify-end">
        <Link className="" href="/about">Learn more about Tie In &#8594;</Link>
      </div>
      <div className="m-auto my-12 max-w-3xl">
        <h1 className="pageTitle">Reset Password</h1>
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
        <ResetForm />
      </div>
    </div>
  )
}

export default RequestResetPage