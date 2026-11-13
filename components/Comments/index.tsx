import { CommentType} from "@/lib/supabase/queries"
import { buildCommentTree } from "@/utils/comment-tree"
import NestedComment from "./nestedComments"
import AddComment from "./addComment"

const Comments = async ({ comments, postId, isAuthor, userId }: { comments: CommentType[] | null, postId: number, isAuthor: boolean, userId: string | null }) => {
  const commentTree = buildCommentTree(comments!) ||  []
  
  return (
    <div>
      <h2 className="subTitle my-8">{comments ? "See what people are saying" : "No one's talking. Start the conversation"}</h2>
      {commentTree && commentTree.map(comment => <NestedComment isAuthor={isAuthor} userId={userId} key={comment.id} comment={comment} postId={postId}/>)}
      {userId && <AddComment postId={postId} parentId={null} closeReply={null}/>}
    </div>
  )
}

export default Comments