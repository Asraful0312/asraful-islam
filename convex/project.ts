import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const insertProject = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    // Validate slug uniqueness
    const existingProject = await ctx.db
      .query("projects")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    if (existingProject) {
      throw new Error("Slug already exists");
    }

    // Insert project
    const projectId = await ctx.db.insert("projects", {
      userId,
      name: args.name,
      slug: args.slug,
      description: args.description,
      thumbnail: args.thumbnail,
      imageGallery: args.imageGallery,
      projectType: args.projectType,
      role: args.role,
      sourceCode: args.sourceCode,
      demoLink: args.demoLink,
      tags: args.tags,
      timeline: args.timeline,
      relatedId: args.relatedId,
      features: args.features,
      technicalDetails: args.technicalDetails,
      challenges: args.challenges,
    });

    return projectId;
  },
});

export const updateProject = mutation({
  args: {
    projectId: v.id("projects"),
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
    deletedImageIds: v.array(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    // Verify project exists and belongs to user
    const project = await ctx.db.get(args.projectId);
    if (!project || project.userId !== userId) {
      throw new Error("Project not found or unauthorized");
    }

    // Validate slug uniqueness (excluding current project)
    const existingProject = await ctx.db
      .query("projects")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    if (existingProject && existingProject._id !== args.projectId) {
      throw new Error("Slug already exists");
    }

    // Delete removed images from storage
    for (const storageId of args.deletedImageIds) {
      await ctx.storage.delete(storageId);
    }

    // Update project
    await ctx.db.patch(args.projectId, {
      name: args.name,
      slug: args.slug,
      description: args.description,
      thumbnail: args.thumbnail,
      imageGallery: args.imageGallery,
      projectType: args.projectType,
      role: args.role,
      sourceCode: args.sourceCode,
      demoLink: args.demoLink,
      tags: args.tags,
      timeline: args.timeline,
      relatedId: args.relatedId,
      features: args.features,
      technicalDetails: args.technicalDetails,
      challenges: args.challenges,
    });

    return args.projectId;
  },
});

export const deleteProject = mutation({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    // Verify project exists and belongs to user
    const project = await ctx.db.get(args.projectId);
    if (!project || project.userId !== userId) {
      throw new Error("Project not found or unauthorized");
    }

    // Delete thumbnail and gallery images from storage
    await ctx.storage.delete(project.thumbnail);
    for (const storageId of project.imageGallery) {
      await ctx.storage.delete(storageId);
    }

    // Delete project
    await ctx.db.delete(args.projectId);
  },
});

export const getProject = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.projectId);
    if (!project) {
      throw new Error("Project not found");
    }

    // Get URLs for thumbnail and image gallery
    const thumbnailUrl = await ctx.storage.getUrl(project.thumbnail);
    const galleryImageUrls = await Promise.all(
      project.imageGallery.map((storageId) => ctx.storage.getUrl(storageId))
    );

    return {
      ...project,
      thumbnailUrl,
      galleryImageUrls,
    };
  },
});

export const getUserProjects = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    const projects = await ctx.db
      .query("projects")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();

    // Get URLs for thumbnails and gallery images
    return await Promise.all(
      projects.map(async (project) => {
        const thumbnailUrl = await ctx.storage.getUrl(project.thumbnail);
        const galleryImageUrls = await Promise.all(
          project.imageGallery.map((storageId) => ctx.storage.getUrl(storageId))
        );
        return { ...project, thumbnailUrl, galleryImageUrls };
      })
    );
  },
});

export const searchProject = query({
  args: { query: v.string() },
  handler: async (ctx, args) => {
    const searchQuery = args.query.toLowerCase().trim();
    if (!searchQuery) {
      return []; // Return empty array for empty query
    }

    // Search blogs using the search index
    const projectResults = await ctx.db
      .query("projects")
      .withSearchIndex("search_projects", (q) => q.search("name", searchQuery))
      .take(5);

    return Promise.all(
      projectResults.map(async (project) => ({
        ...project,

        thumbnailUrl: project.thumbnail
          ? await ctx.storage.getUrl(project.thumbnail)
          : null,
      }))
    );
  },
});

export const getRelatedProjects = query({
  args: { ids: v.array(v.id("projects")) },
  handler: async (ctx, args) => {
    if (args.ids.length === 0) return [];
    const projects = await Promise.all(
      args.ids.map(async (id) => {
        const project = await ctx.db.get(id);
        if (!project) return null;
        return {
          ...project,
          _id: id,
          thumbnailUrl: project.thumbnail
            ? await ctx.storage.getUrl(project.thumbnail)
            : null,
        };
      })
    );
    return projects.filter((project) => project !== null);
  },
});
