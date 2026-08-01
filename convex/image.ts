import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { assertAdmin } from "./helpers";

export const deleteImage = mutation({
  args: { imageId: v.id("_storage") },
  handler: async (ctx, args) => {
    await assertAdmin(ctx);
    await ctx.storage.delete(args.imageId);
  },
});
