'use client'
import { TieIn, UnTie } from "@/actions/tie-in";
import { useState } from "react";

const TieButton = ({ user, post, tiedIn }: { user: string, post: number, tiedIn: boolean }) => {
  const [tieIn, setTieIn] = useState<boolean>(tiedIn)

  const handleClick = () => {
    if (tieIn)
      UnTie({ user: user, post: post })
    else
      TieIn({ user: user, post: post })

    setTieIn(!tieIn)
  }

  return (
    <>
      {user &&
        <div className="linkButton" onClick={handleClick}>
          {tieIn ? "Untie!" : "Tie In!"}
        </div >
      }
    </>
  )
}

export default TieButton