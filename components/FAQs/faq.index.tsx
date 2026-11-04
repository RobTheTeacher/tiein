'use client'
import { CaretDownIcon } from "@phosphor-icons/react"
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
          <div className="flex items-start justify-between" onClick={() => setShowAnswer(!showAnswer)}><p className="basis-7/8">{question}</p> <CaretDownIcon className={`h-8 w-8 basis-1/8 transition ${showAnswer ? 'rotate-0' : 'rotate-180'}` } /></div>
          {showAnswer && <div className="mt-2 basis-7/8 w-7/8 flex-grow-0">{answer.map((item, index) => <p key={index}>{item}</p>)}</div>}
        </div >
      }
    </>
  )
}

export default FAQ