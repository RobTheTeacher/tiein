'use client'
import { DotsThreeCircleVerticalIcon } from "@phosphor-icons/react"
import Link from "next/link"
import { useState } from "react"

const Menu = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false)

  const handleClick = (): void => {
    setOpenMenu(!openMenu)
  }

  return (
    <div className="md:basis-1/5 relative">
      <div onClick={handleClick} className="md:hidden flex gap-4 px-8 py-4 items-center">
        <DotsThreeCircleVerticalIcon size={32} className={`${openMenu ? 'rotate-90' : ''} md:hidden my-2 self-center text-center transition`} />
        <p>Options</p>
      </div>
      <div className={`${openMenu ? "block" : "hidden"} bg-cod-gray p-4 w-screen absolute md:w-auto md:pl-8 md:static md:block`}>
        <div><Link href="/create">+ Thread</Link></div>
        <div>My threads</div>
        <div>My ties</div>
        <div>Explore</div>
      </div>
    </div>
  )
}
export default Menu