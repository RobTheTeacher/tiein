import { UserRoundPlus } from "lucide-react"
import Link from "next/link"

const SignUpButton = () => {
  return (
    <Link className="" href="/signup"><UserRoundPlus size={64} /></Link>
  )
}

export default SignUpButton