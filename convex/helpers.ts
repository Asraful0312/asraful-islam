import { ConvexError } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { QueryCtx, MutationCtx } from "./_generated/server";

export async function assertAdmin(ctx: QueryCtx | MutationCtx): Promise<void> {
  const userId = await getAuthUserId(ctx);
  if (!userId) throw new ConvexError("Unauthorized");

  const user = await ctx.db.get(userId);
  if (!user || user.role !== "admin") {
    throw new ConvexError("Forbidden: admin access required");
  }
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}
