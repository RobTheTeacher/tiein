'use client'
import { DeleteAction } from "@/actions/delete-post"

const DeleteButton = ({postId}: {postId: number}) => {
  return  <button onClick={() => DeleteAction(postId!)} className="linkButton">Delete</button>      
}

export default DeleteButton