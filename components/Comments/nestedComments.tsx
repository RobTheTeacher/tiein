'use client'
import { CommentType } from "@/lib/supabase/queries";
import { CommentTree } from "@/utils/comment-tree";
import { useState } from "react";
import DeleteCommentButton from "./deleteCommentButton";
import AddReply from "./addReply";
import { ListCheck, ListX } from "lucide-react";

const NestedComment = ({ comment, isAuthor, userId, postId }: { comment: CommentTree, isAuthor: boolean, userId: string | null, postId: number }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div>
      <div className="border rounded-2xl p-4 pr-0 mb-4" key={comment.id}>
        <p className="mt-1">{comment.content}</p>
        <div className="text-right font-sm pr-4">by {comment.author.username}</div>
        <div className="relative my-2 text-yellow text-sm">
          {userId  && <AddReply postId={postId} parentId={comment.id} />}
          {(isAuthor || (userId === comment.author.id)) && <div className="absolute top-0 right-4"><DeleteCommentButton commentId={comment.id} /></div>}
        </div>
        <div className="text-sm">
          {comment.replies.length > 0 && (
            <button
              onClick={() => setCollapsed(!collapsed)}
              className={`text-yellow hover:underline flex items-center ${collapsed ? '': 'mb-4'}`}
            >
              {collapsed ? <div className="cursor-pointer flex gap-2"><ListX />{` Show ${comment.replies.length} replies`}</div> : <div className="cursor-pointer flex gap-2"><ListCheck />{` Hide`}</div>}
            </button>
          )}
        </div>

        {!collapsed && comment.replies.length > 0 && (
          <div className="mt-2">
            {comment.replies.map((reply) => (
              <NestedComment key={reply.id} comment={reply} userId={userId} isAuthor={isAuthor} postId={postId} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default NestedComment