'use client'

import LogOutButton from "@/app/(account)/logout"
import CreatePostButton from "@/app/(main)/create/button"
import { DotsThreeCircleVerticalIcon } from "@phosphor-icons/react"
import { useState } from "react"

const MobileMenu = ({ name }: { name: string }) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const handleClick = (): void => {
    setOpenMenu(!openMenu)
  }

  return (
    <>
      <div className={`${openMenu ? 'overflow-visible' : 'overflow-hidden'} flex relative flex-col p-4`}>
        <p className="text-3xl">Welcome {name}</p>
        <DotsThreeCircleVerticalIcon onClick={handleClick} size={32} className="md:hidden my-2 self-center text-center" />

        <div className={`${openMenu ? 'left-[0] overflow-visible' : 'left-[100%] overflow-hidden'} transition-[left] absolute top-[100%] bg-background flex flex-col h-[calc(100vh-100%)] w-full py-4 gap-4 md:block md:static`}>
          <LogOutButton />
          <CreatePostButton />
        </div>
      </div>
    </>
  )
}

export default MobileMenu