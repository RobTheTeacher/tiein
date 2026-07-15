import Link from "next/link"

const CreatePostButton = () => {
  return (
    <button className="linkButton">
      <Link href="/create">
        Create Tie
      </Link>
    </button>
  )
}

export default CreatePostButton