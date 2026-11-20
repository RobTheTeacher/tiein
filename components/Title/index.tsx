import { Finger_Paint } from "next/font/google";
import Link from "next/link";
const fingerPaint = Finger_Paint({
    subsets: ['latin'],
    weight: "400"
  });


const Title = () => {
  return (
    <Link href="/"><h2 className={`text-dark-blue text-8xl my-8 ${fingerPaint.className}`}>Tie In</h2></Link>
  )
}

export default Title