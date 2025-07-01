import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { paginationOptsValidator } from "convex/server";

// Get paginated blogs
export const getBlogs = query({
  args: {
    paginationOpts: paginationOptsValidator,
    isAdmin: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const result = args.isAdmin
      ? await ctx.db
          .query("blogs")

          .order("desc")
          .paginate(args.paginationOpts)
      : await ctx.db
          .query("blogs")
          .withIndex("by_published", (q) => q.eq("published", true))
          .order("desc")
          .paginate(args.paginationOpts);

    const blogsWithDetails = await Promise.all(
      result.page.map(async (blog) => {
        const author = await ctx.db.get(blog.authorId);
        // Fetch featureImageUrl for this specific blog
        const featureImageUrl = blog.featuredImage
          ? await ctx.storage.getUrl(blog.featuredImage)
          : null;

        // Use cached comments count for performance
        const commentsCount = blog.commentsCount || 0;

        const displayAuthor =
          author?.name ||
          (author?.email ? author.email.split("@")[0] : "Anonymous");

        return {
          ...blog,
          author: displayAuthor,
          likesCount: blog.likesCount || 0, // Use cached count from blog document
          commentsCount,
          featureImageUrl, // Single URL or null
          authorImage: author?.image,
        };
      })
    );

    return {
      ...result,
      page: blogsWithDetails,
    };
  },
});

// Get single blog with details
export const getBlog = query({
  args: { blogId: v.id("blogs") },
  handler: async (ctx, args) => {
    const blog = await ctx.db.get(args.blogId);
    if (!blog) return null;

    const author = await ctx.db.get(blog.authorId);

    const userId = await getAuthUserId(ctx);
    let isLiked = false;
    if (userId) {
      const like = await ctx.db
        .query("likes")
        .withIndex("by_blog_and_user", (q) =>
          q.eq("blogId", blog._id).eq("userId", userId)
        )
        .unique();
      isLiked = !!like;
    }

    const featureImageUrl = await ctx.storage.getUrl(blog.featuredImage);

    const displayAuthor =
      author?.name ||
      (author?.email ? author.email.split("@")[0] : "Anonymous");
    return {
      ...blog,
      author: displayAuthor,
      likesCount: blog.likesCount || 0, // Use cached count
      isLiked,
      featureImageUrl,
      authorImage: author?.image,
    };
  },
});

// Get user's blogs
export const getUserBlogs = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const blogs = await ctx.db
      .query("blogs")
      .withIndex("by_author", (q) => q.eq("authorId", userId))
      .order("desc")
      .collect();

    return blogs;
  },
});

// Create blog
export const createBlog = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    excerpt: v.string(),
    published: v.boolean(),
    tags: v.optional(v.array(v.string())),
    readingTime: v.number(),
    featuredImage: v.id("_storage"),
    categories: v.array(v.string()),
    slug: v.string(),
    relatedBlogs: v.optional(v.array(v.id("blogs"))),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Must be logged in to create a blog");

    return await ctx.db.insert("blogs", {
      ...args,
      authorId: userId,
      relatedBlogs: args.relatedBlogs,
      likesCount: 0, // Initialize likes count
      commentsCount: 0, // Initialize comments count
    });
  },
});

// Update blog
export const updateBlog = mutation({
  args: {
    blogId: v.id("blogs"),
    title: v.string(),
    content: v.string(),
    excerpt: v.string(),
    published: v.boolean(),
    tags: v.optional(v.array(v.string())),
    readingTime: v.number(),
    featuredImage: v.id("_storage"),
    categories: v.array(v.string()),
    slug: v.string(),
    relatedBlogs: v.optional(v.array(v.id("blogs"))),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Must be logged in");

    const blog = await ctx.db.get(args.blogId);
    if (!blog) throw new Error("Blog not found");
    if (blog.authorId !== userId) throw new Error("Not authorized");

    const { blogId, ...updates } = args;
    await ctx.db.patch(blogId, updates);
  },
});

// Delete blog
export const deleteBlog = mutation({
  args: { blogId: v.id("blogs"), imageId: v.id("_storage") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Must be logged in");

    const blog = await ctx.db.get(args.blogId);
    if (!blog) throw new Error("Blog not found");
    if (blog.authorId !== userId) throw new Error("Not authorized");

    await ctx.storage.delete(args.imageId);

    // Delete associated comments and likes
    const comments = await ctx.db
      .query("comments")
      .withIndex("by_blog", (q) => q.eq("blogId", args.blogId))
      .collect();

    const likes = await ctx.db
      .query("likes")
      .withIndex("by_blog", (q) => q.eq("blogId", args.blogId))
      .collect();

    for (const comment of comments) {
      await ctx.db.delete(comment._id);
    }

    for (const like of likes) {
      await ctx.db.delete(like._id);
    }

    await ctx.db.delete(args.blogId);
  },
});

// Optimized toggle like with atomic operations
export const toggleLike = mutation({
  args: { blogId: v.id("blogs") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Must be logged in to like");

    // Check if blog exists
    const blog = await ctx.db.get(args.blogId);
    if (!blog) throw new Error("Blog not found");

    const existingLike = await ctx.db
      .query("likes")
      .withIndex("by_blog_and_user", (q) =>
        q.eq("blogId", args.blogId).eq("userId", userId)
      )
      .unique();

    if (existingLike) {
      // Unlike: Remove like and decrement counter atomically
      await ctx.db.delete(existingLike._id);
      await ctx.db.patch(args.blogId, {
        likesCount: Math.max(0, (blog.likesCount || 0) - 1),
      });
      return false; // unliked
    } else {
      // Like: Add like and increment counter atomically
      await ctx.db.insert("likes", {
        blogId: args.blogId,
        userId,
      });
      await ctx.db.patch(args.blogId, {
        likesCount: (blog.likesCount || 0) + 1,
      });
      return true; // liked
    }
  },
});

// Batch like operation for high-concurrency scenarios
export const batchToggleLike = mutation({
  args: {
    blogId: v.id("blogs"),
    action: v.union(v.literal("like"), v.literal("unlike")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Must be logged in to like");

    const blog = await ctx.db.get(args.blogId);
    if (!blog) throw new Error("Blog not found");

    const existingLike = await ctx.db
      .query("likes")
      .withIndex("by_blog_and_user", (q) =>
        q.eq("blogId", args.blogId).eq("userId", userId)
      )
      .unique();

    // Prevent duplicate operations
    if (args.action === "like" && existingLike) {
      return false; // Already liked
    }
    if (args.action === "unlike" && !existingLike) {
      return false; // Already not liked
    }

    if (args.action === "unlike" && existingLike) {
      await ctx.db.delete(existingLike._id);
      await ctx.db.patch(args.blogId, {
        likesCount: Math.max(0, (blog.likesCount || 0) - 1),
      });
      return true;
    } else if (args.action === "like" && !existingLike) {
      await ctx.db.insert("likes", {
        blogId: args.blogId,
        userId,
      });
      await ctx.db.patch(args.blogId, {
        likesCount: (blog.likesCount || 0) + 1,
      });
      return true;
    }

    return false;
  },
});

// Repair likes count (for data consistency maintenance)
export const repairLikesCount = mutation({
  args: { blogId: v.id("blogs") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Must be logged in");

    const blog = await ctx.db.get(args.blogId);
    if (!blog) throw new Error("Blog not found");

    // Only allow blog author to repair counts
    if (blog.authorId !== userId) throw new Error("Not authorized");

    const actualLikesCount = await ctx.db
      .query("likes")
      .withIndex("by_blog", (q) => q.eq("blogId", args.blogId))
      .collect()
      .then((likes) => likes.length);

    await ctx.db.patch(args.blogId, {
      likesCount: actualLikesCount,
    });

    return actualLikesCount;
  },
});

export const searchBlog = query({
  args: { query: v.string() },
  handler: async (ctx, args) => {
    const searchQuery = args.query.toLowerCase().trim();
    if (!searchQuery) {
      return []; // Return empty array for empty query
    }

    // Search blogs using the search index
    const blogResults = await ctx.db
      .query("blogs")
      .withSearchIndex("search_blogs", (q) =>
        q.search("title", searchQuery).eq("published", true)
      )
      .take(5);

    return Promise.all(
      blogResults.map(async (blog) => ({
        ...blog,

        featureImageUrl: blog.featuredImage
          ? await ctx.storage.getUrl(blog.featuredImage)
          : null,
      }))
    );
  },
});

export const getRelatedBlogs = query({
  args: { ids: v.array(v.id("blogs")) },
  handler: async (ctx, args) => {
    if (args.ids.length === 0) return [];
    const blogs = await Promise.all(
      args.ids.map(async (id) => {
        const blog = await ctx.db.get(id);
        if (!blog) return null;
        return {
          ...blog,
          _id: id,
          featureImageUrl: blog.featuredImage
            ? await ctx.storage.getUrl(blog.featuredImage)
            : null,
        };
      })
    );
    return blogs.filter((blog) => blog !== null);
  },
});
