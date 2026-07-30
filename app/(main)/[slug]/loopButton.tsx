'use client'
import { LoopIn, UnLoop } from "@/actions/loop-in";

const LoopButton = ({ user, post, loopedIn }: { user: string, post: number, loopedIn: boolean }) => {
  return (
    <>
      {user &&
        loopedIn ?
        <div className="linkButton" onClick={() => UnLoop({ user: user, post: post })}>
          UnLoop!
        </div >
        :
        <div className="linkButton" onClick={() => LoopIn({ user: user, post: post })}>
          Keep me in the loop!
        </div>
      }
    </>
  )
}

export default LoopButton