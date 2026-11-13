import { CommentType } from "@/lib/supabase/queries";

export type CommentTree = {
  id: number;
  content: string;
  parent: number | null;
  author: {
        id: string;
        username: string;
  }
  replies: CommentTree[];
}

export const  buildCommentTree = (comments: Omit<CommentTree, 'replies'>[]): CommentTree[] => {
  const map = new Map<number, CommentTree>();
  const replies: CommentTree[] = [];

  comments.forEach((comment) => {
    map.set(comment.id, { ...comment, replies: [] });
  });

  comments.forEach((comment) => {
    const reply = map.get(comment.id)!;

    if (comment.parent && map.has(comment.parent)) {
      map.get(comment.parent)!.replies.push(reply);
    } else {
      replies.push(reply);
    }
  });

  return replies;
}

export const nestedReplies = () => {

}
  

