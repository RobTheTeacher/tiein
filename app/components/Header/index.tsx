import Image from "next/image"
import Link from 'next/link'
import AccountLinks from "./accountLinks"

const Header = () => {
  return (
    <div className="flex items-center justify-center gap-6 w-full sm:text-left">
      <Image
        className="dark:invert"
        src="/logo.png"
        alt="Next.js logo"
        width={300}
        height={300}
        priority
      />
      <Link href="/" className="text-8xl flex items-center">Tie in</Link>
      <AccountLinks />
    </div>
  )
}

export default Header