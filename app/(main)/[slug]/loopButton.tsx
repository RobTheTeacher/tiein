'use client'
import { LoopIn, UnLoop } from "@/actions/loop-in";
import { useState } from "react";

const LoopButton = ({ user, post, loopedIn }: { user: string, post: number, loopedIn: boolean }) => {
  const [loop, setLoop] = useState<boolean>(loopedIn)
  const handleClick = () => {
    if (loop)
      UnLoop({ user: user, post: post })
    else
      LoopIn({ user: user, post: post })

    setLoop(!loop)
  }
  return (
    <>
      {user &&
        <div className="linkButton" onClick={handleClick}>
          {loop ? "UnLoop!" : "Keep me in the loop"}
        </div >
      }
    </>
  )
}

export default LoopButton