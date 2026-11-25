'use client'
import Link from "next/link"
import { useRouter } from 'next/navigation'

const CreatePageHeader = () => {
  const router = useRouter();
  return (
    <header className="relative flex flex-wrap items-center justify-between w-full p-4">
      <div className="basis-14.5 md:basis-24.5">
        <img className="aspect-auto" src="/back.png" alt="Go Back" onClick={router.back} />
      </div>
      <Link className="p-4 pr-0" href="/">
        <h2 className="font-heading text-dark-blue text-8xl">Tie In</h2>
      </Link>
    </header>
  )
}

export default CreatePageHeader 