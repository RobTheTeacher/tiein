'use client'
import LogInButton from '@/app/(account)/login/button';
import SignUpButton from '@/app/(account)/signup/button';
import LogOutButton from '@/app/(account)/logout';
import CreatePostButton from '@/app/(main)/create/button';
import { useState } from 'react';
import { DotsThreeCircleVerticalIcon } from '@phosphor-icons/react';

const AccountLinks = ({ loggedIn }: { loggedIn: boolean }) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const handleClick = (): void => {
    setOpenMenu(!openMenu)
  }

  return (
    <>
      <div className={`${openMenu ? 'rotate-90' : ''} transition flex relative flex-col order-3`}>
        <DotsThreeCircleVerticalIcon onClick={handleClick} size={32} className="md:hidden my-2 self-center text-center" />
      </div>
      <div className={`absolute top-[175px] z-10 h-[calc(100vh-95px)] bottom-0 bg-black flex-col  transition-[left] flex-1/4 justify-start gap-6 p-4 w-full md:w-auto md:flex-row md:flex md:static md:h-auto md:flex-end md:order-3
        ${openMenu ? 'left-0 flex' : 'left-[100vw] hidden'}
        `}>
        {loggedIn ?
          <>
            <LogOutButton />
            <CreatePostButton />
          </> : <>
            <LogInButton />
            <SignUpButton />
          </>
        }
      </div>
    </>
  )
}

export default AccountLinks
