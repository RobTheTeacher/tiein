'use client'
import { TieIn, UnTie } from "@/actions/tie-in";

const TieButton = ({ user, post, tiedIn }: { user: string, post: number, tiedIn: boolean }) => {
  return (
    <>
      {user &&
        tiedIn ?
        <div className="linkButton" onClick={() => UnTie({ user: user, post: post })}>
          Untie!
        </div >
        :
        <div className="linkButton" onClick={() => TieIn({ user: user, post: post })}>
          Tie in!
        </div>
      }

    </>
  )
}

export default TieButton