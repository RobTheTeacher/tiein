'use client'
import { DotsThreeCircleVerticalIcon } from "@phosphor-icons/react"
import Link from "next/link"
import { useState } from "react"

const Menu = () => {
  const [openSideBar, setOpenSideBar] = useState<boolean>(false)

  const handleClick = (): void => {
    setOpenSideBar(!openSideBar)
  }

  return (
    <div className="md:basis-1/5">
      <div onClick={handleClick} className="md:hidden flex gap-4 px-8 py-4 items-center">
        <DotsThreeCircleVerticalIcon size={32} className="md:hidden my-2 self-center text-center" />
        <p>Options</p>
      </div>
      <div className={`${openSideBar ? "block" : "hidden"} pl-8 pb-4 md:block`}>
        <div><Link href="/create">+ Thread</Link></div>
        <div>My threads</div>
        <div>My ties</div>
        <div>Explore</div>
      </div>
    </div>
  )
}
export default Menu