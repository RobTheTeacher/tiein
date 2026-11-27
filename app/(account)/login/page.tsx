import Link from "next/link"
import LogInForm from "./form"
import About from "@/components/About"
import Title from "@/components/Title"

const LogInPage = () => {
  return (
    <div className="accountPage">
      <img className="absolute top-0 -z-10 h-screen rotate-180 w-[90%] md:w-[50%]" src="/backgrounds/login-bg.png" />
      <About />
      <div className="md:flex pt-8 w-full h-full items-center justify-end">
        <div className="basis-2/5 flex flex-col">
          <h1 className="text-3xl self-start">Log in to</h1>
          <Title />
          <LogInForm />
        </div>
      </div>
    </div>
  )
}

export default LogInPage