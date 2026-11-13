'use client'
import { useState } from "react"
import AddComment from "./addComment"

const AddReply = ({ postId, parentId }: { postId: number, parentId: number }) => {
  const [openReply, setOpenReply] = useState<boolean>(false)
  const handleClick = () => setOpenReply(!openReply)

  return (
    <div>
      <div onClick={handleClick} className="text-yellow cursor-pointer">
        <span className="cursor-pointer">Reply?</span>
      </div>
      {openReply &&
        <div className="w-full relative pr-4 text-md">
          <AddComment postId={postId} parentId={parentId} closeReply={setOpenReply} />
        </div>}
    </div>
  )
}

export default AddReply