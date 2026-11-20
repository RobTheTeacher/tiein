'use client'

import { LogOutAction } from "@/actions/logout"
import { LogOut } from "lucide-react"

const LogOutButton = () => {
  return (
    <button className="linkButton" title="Log Out" onClick={() => LogOutAction()}><LogOut size={64} className="text-orange"  /></button>
  )
}


export default LogOutButton