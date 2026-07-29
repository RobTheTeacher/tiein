'use client'
import { LoopIn } from "@/actions/loop-in";

const LoopButton = ({ user, post }: { user: string, post: number }) => {
  return (
    <>
      {user &&
        <div onClick={() => LoopIn({ user: user, post: post })}>
          Keep me in the loop!</div>
      }
    </>
  )
}

export default LoopButton