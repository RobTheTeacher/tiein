'use client'
import { DeleteComment } from "@/actions/delete-comment"

const DeleteCommentButton = ({commentId}: {commentId:number}) => {
  return (
    <div className="buttonSecondary cursor-pointer" onClick={() => DeleteComment(commentId)}>Remove comment?</div>
  )
}

export default DeleteCommentButton