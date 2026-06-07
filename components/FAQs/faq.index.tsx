'use client'
import { useState } from "react"

type faqProps = {
  question: string,
  answer: string[]
}

const FAQ = ({ question, answer }: faqProps) => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false)
  return (
    <>
      {question &&
        <div className="border border-gray-300 mb-4 p-2">
          <div onClick={() => setShowAnswer(!showAnswer)} className="">{question} {showAnswer ? '^' : 'v' }</div>
          {showAnswer && <div className="mt-2">{answer.map((item, index) => <p key={index}>{item}</p>)}</div>}
        </div >
      }
    </>
  )
}

export default FAQ