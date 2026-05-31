'use client'

import { LogOut } from "@/actions/logout"

const LogOutButton = () => {
  return (
    <button className="linkButton" onClick={() => LogOut()}>Log Out</button>
  )
}


export default LogOutButton