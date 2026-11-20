'use client'
import LogInButton from '@/app/(account)/login/button';
import SignUpButton from '@/app/(account)/signup/button';
import LogOutButton from '@/app/(account)/logout';
import CreatePostButton from '@/app/(main)/create/button';
import { useEffect, useState } from 'react';
import { DotsThreeCircleVerticalIcon } from '@phosphor-icons/react';
import { usePathname } from 'next/navigation';

const AccountLinks = ({ loggedIn }: { loggedIn: boolean }) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const pathname = usePathname()

  useEffect(() => {
    setOpenMenu(false)
  }, [pathname])
  const handleClick = (): void => {
    setOpenMenu(!openMenu)
  }

  return (
    <>
      <div className={`${openMenu ? 'rotate-90' : ''} transition flex relative flex-col order-3`}>
        <DotsThreeCircleVerticalIcon onClick={handleClick} size={64} className="md:hidden my-2 self-center text-center text-orange" />
      </div>
      <div className={`absolute top-[128px] z-10 h-[calc(100vh-95px)] bottom-0  flex-col transition-[left] flex-1/4 justify-start gap-6 p-4 w-full md:w-auto md:flex-row md:flex md:static md:h-auto md:flex-end md:order-3
        ${openMenu ? 'left-0 flex no-scroll bg-dark-blue' : 'left-[100vw] bg-transparent hidden'}
        `}>
        {loggedIn ?
          <div className="text-orange font-bold text-4xl gap-8 w-full flex flex-col items-end">
            <LogOutButton />
            <CreatePostButton />
          </div> :
          <div className="text-orange font-bold text-4xl gap-8 w-full flex flex-col items-end">
            <LogInButton />
            <SignUpButton />
          </div>
        }
      </div>
    </>
  )
}

export default AccountLinks
