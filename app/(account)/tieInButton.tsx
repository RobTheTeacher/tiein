import { ArrowRight } from "lucide-react"

const TieInButton = () => {
  return (
    <button type="submit" className="flex items-center my-8 text-4xl cursor-pointer text-dark-blue font-bold">
      <p>Tie In</p>
      <ArrowRight size={48} />
    </button>
  )
}

export default TieInButton