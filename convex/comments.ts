import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { paginationOptsValidator } from "convex/server";

// Get paginated top-level comments for a blog
export const getComments = query({
  args: {
    blogId: v.id("blogs"),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    // Get only top-level comments (no parent)
    const result = await ctx.db
      .query("comments")
      .withIndex("by_blog_and_parent", (q) =>
        q.eq("blogId", args.blogId).eq("parentCommentId", undefined)
      )
      .order("desc")
      .paginate(args.paginationOpts);

    const commentsWithDetails = await Promise.all(
      result.page.map(async (comment) => {
        const author = await ctx.db.get(comment.authorId);

        // Check if user liked this comment
        let isLiked = false;
        if (userId) {
          const like = await ctx.db
            .query("commentLikes")
            .withIndex("by_comment_and_user", (q) =>
              q.eq("commentId", comment._id).eq("userId", userId)
            )
            .unique();
          isLiked = !!like;
        }

        // Get reply count
        const replyCount = await ctx.db
          .query("comments")
          .withIndex("by_parent", (q) => q.eq("parentCommentId", comment._id))
          .collect()
          .then((replies) => replies.length);

        let displayAuthor = "Anonymous";
        if (author?.name) {
          displayAuthor = author.name;
        } else if (author?.email) {
          const [localPart] = author.email.split("@");
          if (localPart.length > 4) {
            // Show first two and last two characters, with *** in the middle
            displayAuthor = `${localPart.slice(0, 3)}***${localPart.slice(-3)}`;
          } else {
            // For short emails, just show first character and ***
            displayAuthor = `${localPart.slice(0, 2)}***`;
          }
        }

        return {
          ...comment,
          author: displayAuthor,
          likesCount: comment.likesCount || 0,
          isLiked,
          replyCount,
        };
      })
    );

    return {
      ...result,
      page: commentsWithDetails,
    };
  },
});

// Get replies for a comment
export const getReplies = query({
  args: {
    commentId: v.id("comments"),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    const result = await ctx.db
      .query("comments")
      .withIndex("by_parent", (q) => q.eq("parentCommentId", args.commentId))
      .order("asc")
      .paginate(args.paginationOpts);

    const repliesWithDetails = await Promise.all(
      result.page.map(async (reply) => {
        const author = await ctx.db.get(reply.authorId);

        let isLiked = false;
        if (userId) {
          const like = await ctx.db
            .query("commentLikes")
            .withIndex("by_comment_and_user", (q) =>
              q.eq("commentId", reply._id).eq("userId", userId)
            )
            .unique();
          isLiked = !!like;
        }
        let displayAuthor = "Anonymous";
        if (author?.name) {
          displayAuthor = author.name;
        } else if (author?.email) {
          const [localPart] = author.email.split("@");
          if (localPart.length > 4) {
            // Show first two and last two characters, with *** in the middle
            displayAuthor = `${localPart.slice(0, 3)}***${localPart.slice(-3)}`;
          } else {
            // For short emails, just show first character and ***
            displayAuthor = `${localPart.slice(0, 2)}***`;
          }
        }

        return {
          ...reply,
          author: displayAuthor,
          likesCount: reply.likesCount || 0,
          isLiked,
        };
      })
    );

    return {
      ...result,
      page: repliesWithDetails,
    };
  },
});

// Get total comments count for a blog (for display purposes)
export const getCommentsCount = query({
  args: { blogId: v.id("blogs") },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query("comments")
      .withIndex("by_blog", (q) => q.eq("blogId", args.blogId))
      .collect();

    return comments.length;
  },
});

// Add comment or reply
export const addComment = mutation({
  args: {
    blogId: v.id("blogs"),
    content: v.string(),
    parentCommentId: v.optional(v.id("comments")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Must be logged in to comment");

    // Check if blog exists
    const blog = await ctx.db.get(args.blogId);
    if (!blog) throw new Error("Blog not found");

    // If replying, check if parent comment exists
    if (args.parentCommentId) {
      const parentComment = await ctx.db.get(args.parentCommentId);
      if (!parentComment) throw new Error("Parent comment not found");
      if (parentComment.blogId !== args.blogId)
        throw new Error("Comment doesn't belong to this blog");
    }

    // Insert comment/reply
    await ctx.db.insert("comments", {
      blogId: args.blogId,
      authorId: userId,
      content: args.content,
      parentCommentId: args.parentCommentId,
      likesCount: 0,
    });

    // Only increment blog comment count for top-level comments
    if (!args.parentCommentId) {
      await ctx.db.patch(args.blogId, {
        commentsCount: (blog.commentsCount || 0) + 1,
      });
    }

    return null;
  },
});

// Delete comment
export const deleteComment = mutation({
  args: { commentId: v.id("comments") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Must be logged in");

    const comment = await ctx.db.get(args.commentId);
    if (!comment) throw new Error("Comment not found");
    if (comment.authorId !== userId) throw new Error("Not authorized");

    const blog = await ctx.db.get(comment.blogId);
    if (!blog) throw new Error("Blog not found");

    // Delete all replies first
    const replies = await ctx.db
      .query("comments")
      .withIndex("by_parent", (q) => q.eq("parentCommentId", comment._id))
      .collect();

    for (const reply of replies) {
      // Delete reply likes
      const replyLikes = await ctx.db
        .query("commentLikes")
        .withIndex("by_comment", (q) => q.eq("commentId", reply._id))
        .collect();

      for (const like of replyLikes) {
        await ctx.db.delete(like._id);
      }

      await ctx.db.delete(reply._id);
    }

    // Delete comment likes
    const commentLikes = await ctx.db
      .query("commentLikes")
      .withIndex("by_comment", (q) => q.eq("commentId", comment._id))
      .collect();

    for (const like of commentLikes) {
      await ctx.db.delete(like._id);
    }

    // Delete the comment
    await ctx.db.delete(args.commentId);

    // Only decrement blog comment count for top-level comments
    if (!comment.parentCommentId) {
      await ctx.db.patch(comment.blogId, {
        commentsCount: Math.max(0, (blog.commentsCount || 0) - 1),
      });
    }
  },
});

// Toggle comment like
export const toggleCommentLike = mutation({
  args: { commentId: v.id("comments") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Must be logged in to like");

    const comment = await ctx.db.get(args.commentId);
    if (!comment) throw new Error("Comment not found");

    const existingLike = await ctx.db
      .query("commentLikes")
      .withIndex("by_comment_and_user", (q) =>
        q.eq("commentId", args.commentId).eq("userId", userId)
      )
      .unique();

    if (existingLike) {
      // Unlike: Remove like and decrement counter
      await ctx.db.delete(existingLike._id);
      await ctx.db.patch(args.commentId, {
        likesCount: Math.max(0, (comment.likesCount || 0) - 1),
      });
      return false; // unliked
    } else {
      // Like: Add like and increment counter
      await ctx.db.insert("commentLikes", {
        commentId: args.commentId,
        userId,
      });
      await ctx.db.patch(args.commentId, {
        likesCount: (comment.likesCount || 0) + 1,
      });
      return true; // liked
    }
  },
});
