import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,
  projects: defineTable({
    userId: v.id("users"),
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    thumbnail: v.id("_storage"),
    imageGallery: v.array(v.id("_storage")),
    projectType: v.string(),
    role: v.string(),
    sourceCode: v.optional(v.string()),
    demoLink: v.optional(v.string()),
    tags: v.array(v.string()),
    timeline: v.string(),
    relatedId: v.optional(v.array(v.id("projects"))),
    features: v.array(
      v.object({
        title: v.string(),
        description: v.string(),
      })
    ),
    technicalDetails: v.array(
      v.object({
        title: v.string(),
        description: v.string(),
      })
    ),
    challenges: v.array(
      v.object({
        title: v.string(),
        description: v.string(),
      })
    ),
  })
    .index("by_userId", ["userId"])
    .index("by_slug", ["slug"])
    .searchIndex("search_projects", {
      searchField: "name",
    }),

  blogs: defineTable({
    title: v.string(),
    content: v.string(),
    excerpt: v.string(),
    authorId: v.id("users"),
    slug: v.string(),
    readingTime: v.number(),
    featuredImage: v.id("_storage"),
    published: v.boolean(),
    categories: v.array(v.string()),
    tags: v.optional(v.array(v.string())),
    likesCount: v.optional(v.number()), // Cached likes count for performance
    commentsCount: v.optional(v.number()), // Cached comments count for performance
    relatedBlogs: v.optional(v.array(v.id("blogs"))), // Array of blog IDs
  })
    .index("by_author", ["authorId"])
    .index("by_published", ["published"])
    .index("by_likes_count", ["likesCount"])
    .searchIndex("search_blogs", {
      searchField: "title",
      filterFields: ["published"],
    }),

  comments: defineTable({
    blogId: v.id("blogs"),
    authorId: v.id("users"),
    content: v.string(),
    parentCommentId: v.optional(v.id("comments")), // For replies
    likesCount: v.optional(v.number()), // Cached likes count
  })
    .index("by_blog", ["blogId"])
    .index("by_author", ["authorId"])
    .index("by_parent", ["parentCommentId"])
    .index("by_blog_and_parent", ["blogId", "parentCommentId"]),

  commentLikes: defineTable({
    commentId: v.id("comments"),
    userId: v.id("users"),
  })
    .index("by_comment", ["commentId"])
    .index("by_user", ["userId"])
    .index("by_comment_and_user", ["commentId", "userId"]),

  likes: defineTable({
    blogId: v.id("blogs"),
    userId: v.id("users"),
  })
    .index("by_blog", ["blogId"])
    .index("by_user", ["userId"])
    .index("by_blog_and_user", ["blogId", "userId"]),
});
