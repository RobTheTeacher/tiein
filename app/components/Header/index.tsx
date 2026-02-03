import Image from "next/image"

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
        <h1 className="text-8xl flex items-center">Tie in</h1>
        </div>
  )
}

export default Header