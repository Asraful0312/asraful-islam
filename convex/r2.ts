import { R2 } from "@convex-dev/r2";
import { ConvexError, v } from "convex/values";
import { components } from "./_generated/api";
import type { DataModel } from "./_generated/dataModel";
import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation } from "./_generated/server";
import { assertAdmin } from "./helpers";

export const r2 = new R2(components.r2);

export const CDN_BASE = "https://assets.asrafulislam.uk";

export function getSourceFileUrl(key: string): string {
  return `${CDN_BASE}/${key.split("/").map(encodeURIComponent).join("/")}`;
}

// Client API — used by useUploadFile hook in React
// checkUpload runs server-side before the upload is allowed
export const { generateUploadUrl, syncMetadata } = r2.clientApi<DataModel>({
  checkUpload: async (ctx, _bucket) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new ConvexError("Unauthorized");
    const user = await ctx.db.get(userId);
    if (!user || user.role !== "admin") {
      throw new ConvexError("Forbidden: admin access required");
    }
  },
});

export const deleteSourceFile = mutation({
  args: { key: v.string() },
  handler: async (ctx, args) => {
    await assertAdmin(ctx);
    await r2.deleteObject(ctx, args.key);
  },
});
