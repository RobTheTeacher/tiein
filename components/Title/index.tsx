import { Finger_Paint } from "next/font/google";
const fingerPaint = Finger_Paint({
    subsets: ['latin'],
    weight: "400"
  });


const Title = () => {
  return (
    <h2 className={`text-dark-blue text-8xl my-8 ${fingerPaint.className}`}>Tie In</h2>
  )
}

export default Title