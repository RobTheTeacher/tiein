import { Plus } from "lucide-react"
import Link from "next/link"

const CreatePostButton = () => {
  return (
      <Link title="Create thread" className="linkButton" href="/create"><Plus size={64} className="text-orange"/></Link>
  )
}

export default CreatePostButton