import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery, useMutation } from "convex/react";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Loader, Reply, Send, ThumbsUp, Trash } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import { motion } from "framer-motion";

interface BlogDetailProps {
  blogId: string;
}

interface CommentItemProps {
  comment: any;
  blogId: string;
  onDelete: (commentId: Id<"comments">) => void;
  onReply: (commentId: Id<"comments">) => void;
  loggedInUser: any;
  level?: number;
}

function CommentItem({
  comment,
  blogId,
  onDelete,
  onReply,
  loggedInUser,
  level = 0,
}: CommentItemProps) {
  const [showReplies, setShowReplies] = useState(false);
  const [repliesPagination, setRepliesPagination] = useState({
    numItems: 5,
    cursor: null as string | null,
  });

  const repliesResult = useQuery(
    api.comments.getReplies,
    showReplies
      ? {
          commentId: comment._id,
          paginationOpts: repliesPagination,
        }
      : "skip"
  );

  const toggleCommentLike = useMutation(api.comments.toggleCommentLike);
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = useCallback(async () => {
    if (isLiking) return;

    setIsLiking(true);
    try {
      await toggleCommentLike({ commentId: comment._id });
    } catch (error) {
      toast.error("Failed to update like");
    } finally {
      setTimeout(() => setIsLiking(false), 300);
    }
  }, [toggleCommentLike, comment._id, isLiking]);

  const loadMoreReplies = () => {
    if (repliesResult?.continueCursor) {
      setRepliesPagination({
        numItems: 5,
        cursor: repliesResult.continueCursor,
      });
    }
  };

  return (
    <div
      className={`${level > 0 ? "ml-8 border-l-2 border-purple-500 pl-4" : ""}`}
    >
      <div className="border-b pb-4 last:border-b-0">
        <div className="flex items-center justify-between mb-2 bg-[#232323]">
          <div className=" rounded-lg p-4 w-full">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-sm">{comment.author}</h4>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">
                  {" "}
                  {new Date(comment._creationTime).toLocaleDateString()}
                </span>

                {loggedInUser && comment.authorId === loggedInUser._id && (
                  <button
                    onClick={() => onDelete(comment._id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    <Trash className="size-5 shrink-0" />
                  </button>
                )}
              </div>
            </div>
            <p className="text-gray-300 text-sm">{comment.content}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <button
            onClick={handleLike}
            disabled={isLiking}
            className={`flex items-center gap-1 text-xs transition-colors ${
              comment.isLiked
                ? "text-purple-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <ThumbsUp
              className={`h-3 w-3 ${comment.isLiked ? "fill-current" : ""}`}
            />
            {comment.likesCount || 0}
          </button>

          {level === 0 && (
            <button
              onClick={() => onReply(comment._id)}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors"
            >
              <Reply className="h-3 w-3" />
              Reply
            </button>
          )}

          {level === 0 && comment.replyCount > 0 && (
            <button
              onClick={() => setShowReplies(!showReplies)}
              className="text-blue-600 text-xs px-2 py-1 rounded "
            >
              {showReplies ? "Hide" : "Show"} {comment.replyCount}{" "}
              {comment.replyCount === 1 ? "reply" : "replies"}
            </button>
          )}
        </div>
      </div>

      {/* Replies */}
      {showReplies && repliesResult && (
        <div className="mt-4 space-y-4">
          {repliesResult.page.map((reply: any) => (
            <CommentItem
              key={reply._id}
              comment={reply}
              blogId={blogId}
              onDelete={onDelete}
              onReply={onReply}
              loggedInUser={loggedInUser}
              level={level + 1}
            />
          ))}

          {!repliesResult.isDone && (
            <button
              onClick={loadMoreReplies}
              className="text-blue-600 hover:text-blue-800 text-sm px-2 py-1 rounded hover:bg-blue-50"
            >
              Load more replies
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function CommentSection({ blogId }: BlogDetailProps) {
  const blog = useQuery(api.blogs.getBlog, { blogId: blogId as Id<"blogs"> });
  const [commentsPagination, setCommentsPagination] = useState({
    numItems: 10,
    cursor: null as string | null,
  });
  const commentsResult = useQuery(api.comments.getComments, {
    blogId: blogId as Id<"blogs">,
    paginationOpts: commentsPagination,
  });
  const totalCommentsCount = useQuery(api.comments.getCommentsCount, {
    blogId: blogId as Id<"blogs">,
  });
  const [newComment, setNewComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [replyingTo, setReplyingTo] = useState<Id<"comments"> | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  const addComment = useMutation(api.comments.addComment);
  const deleteComment = useMutation(api.comments.deleteComment);
  const loggedInUser = useQuery(api.auth.loggedInUser);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmittingComment(true);
    try {
      await addComment({
        blogId: blogId as Id<"blogs">,
        content: newComment.trim(),
      });
      setNewComment("");
      // Reset pagination to show the new comment at the top
      setCommentsPagination({
        numItems: 10,
        cursor: null,
      });
      toast.success("Comment added!");
    } catch (error) {
      toast.error("Failed to add comment. did you logged in?");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleAddReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim() || !replyingTo) return;

    setIsSubmittingReply(true);
    try {
      await addComment({
        blogId: blogId as Id<"blogs">,
        content: replyContent.trim(),
        parentCommentId: replyingTo,
      });
      setReplyContent("");
      setReplyingTo(null);
      toast.success("Reply added!");
    } catch (error) {
      toast.error("Failed to add reply");
    } finally {
      setIsSubmittingReply(false);
    }
  };

  const handleDeleteComment = async (commentId: Id<"comments">) => {
    try {
      await deleteComment({ commentId });
      toast.success("Comment deleted");
    } catch (error) {
      toast.error("Failed to delete comment");
    }
  };

  const handleReply = (commentId: Id<"comments">) => {
    setReplyingTo(commentId);
  };

  const loadMoreComments = () => {
    if (commentsResult?.continueCursor) {
      setCommentsPagination({
        numItems: 10,
        cursor: commentsResult.continueCursor,
      });
    }
  };

  const loadPreviousComments = () => {
    setCommentsPagination({
      numItems: 10,
      cursor: null,
    });
  };

  if (!blog) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <section className="mt-12">
      <Separator className="mb-8 bg-gray-800" />

      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-2">
          Comments ({totalCommentsCount || 0})
        </h3>
        <p className="text-gray-400">
          Join the discussion and share your thoughts!
        </p>
      </div>

      {/* Add Comment Form */}
      <form onSubmit={handleAddComment} className="mb-8">
        <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-6">
          <h4 className="text-lg font-semibold mb-4">Leave a Comment</h4>

          <Textarea
            placeholder="Write your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
            rows={4}
            className="bg-[#232323] border-gray-700 focus:border-purple-500 mb-4"
          />
          <Button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700"
            disabled={isSubmittingComment || !newComment.trim()}
          >
            {isSubmittingComment ? (
              <>
                <Loader className="animate-spin size-4 shrink-0 mr-0" />{" "}
                Commenting...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Post Comment
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Reply Form */}
      {replyingTo && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-3 mb-4"
        >
          <div className="flex gap-2">
            <Textarea
              placeholder="Write a reply..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="bg-[#1a1a1a] border-gray-700 focus:border-purple-500 text-sm"
              rows={2}
            />
            <div className="flex flex-col gap-1">
              <Button
                onClick={handleAddReply}
                size="sm"
                className="bg-purple-600 hover:bg-purple-700"
                disabled={isSubmittingReply || !replyContent.trim()}
              >
                {isSubmittingReply ? (
                  <Loader className="size-3 animate-spin shrink-0" />
                ) : (
                  <Send className="h-3 w-3" />
                )}
              </Button>
              <Button
                onClick={() => {
                  setReplyingTo(null);
                  setReplyContent("");
                }}
                size="sm"
                variant="outline"
                className="border-gray-700"
              >
                Cancel
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Comments List */}
      {commentsResult === undefined ? (
        <div className="flex justify-center items-center min-h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {commentsResult?.page.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              blogId={blogId}
              onDelete={handleDeleteComment}
              onReply={handleReply}
              loggedInUser={loggedInUser}
            />
          ))}

          {commentsResult?.page.length === 0 && (
            <p className="text-gray-500 text-center py-8">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
      )}

      {/* Comments Pagination */}
      {commentsResult && (totalCommentsCount || 0) > 10 && (
        <div className="flex justify-center gap-4 mt-8 pt-6 border-t border-gray-200">
          {commentsPagination.cursor && (
            <button
              onClick={loadPreviousComments}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
            >
              Show Latest Comments
            </button>
          )}
          {!commentsResult.isDone && (
            <button
              onClick={loadMoreComments}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover transition-colors"
            >
              Load More Comments (
              {Math.max(
                0,
                (totalCommentsCount || 0) - (commentsResult.page.length || 0)
              )}{" "}
              remaining)
            </button>
          )}
        </div>
      )}
    </section>
  );
}
