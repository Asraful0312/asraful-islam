import { getAuthUserId } from "@convex-dev/auth/server";
import { internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

export const getNotes = query({
  handler: async (ctx) => {
    return await ctx.db.query("notes").collect();
  },
});

export const createNote = mutation({
  args: {
    content: v.string(),
    color: v.string(),
    position: v.object({ x: v.number(), y: v.number() }),
    createdAt: v.string(),
    author: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    const noteId = await ctx.db.insert("notes", { ...args, userId });

    await ctx.scheduler.runAfter(24 * 60 * 60 * 1000, internal.notes.destruct, {
      noteId: noteId,
    });
  },
});

export const destruct = internalMutation({
  args: {
    noteId: v.id("notes"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.noteId);
  },
});

export const deleteNote = mutation({
  args: {
    id: v.id("notes"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const updateNotePosition = mutation({
  args: {
    id: v.id("notes"),
    position: v.object({ x: v.number(), y: v.number() }),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      position: args.position,
    });
  },
});

export const editNote = mutation({
  args: {
    noteId: v.id("notes"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    const { content } = args;
    if (!userId) throw new Error("Unauthorized");

    if (!content) {
      throw new Error("All fields required");
    }
    await ctx.db.patch(args.noteId, {
      content,
    });
  },
});
