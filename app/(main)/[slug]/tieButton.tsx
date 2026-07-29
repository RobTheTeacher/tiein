'use client'
import { TieIn } from "@/actions/tie-in";

const TieButton = ({ user, post }: { user: string, post: number }) => {
  return (
    <>
      {user &&
        <div onClick={() => TieIn({ user: user, post: post })}>
          Tie in!</div>
      }
    </>
  )
}

export default TieButton