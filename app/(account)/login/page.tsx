import Link from "next/link"
import LogInForm from "./form"
import About from "@/components/About"

const LogInPage = () => {
  return (
    <div>
      <About />
      <div className="md:flex w-full items-center">
        <Link href="/" className="basis-3/5 max-w-3/5">
          <img src="/cropped-tie-in.gif"  alt="tie in" />
        </Link>
        <div className="basis-2/5 flex flex-col">
          <LogInForm />
        </div>
      </div>
    </div>
  )
}

export default LogInPage