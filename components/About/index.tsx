import Link from "next/link"

const About = () => {
  return (
    <div className="flex justify-center mb-4 md:justify-end">
        <Link href="/about" className="line link">Learn more about Tie In</Link>
      </div>
  )
}

export default About