import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";
import { assertAdmin } from "./helpers";
import { getSourceFileUrl } from "./r2";

// Preview images use Convex storage (upload URL for the admin form)
export const generatePreviewUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    await assertAdmin(ctx);
    return await ctx.storage.generateUploadUrl();
  },
});

function withUrls<T extends { previewImage: string; sourceFileKey?: string }>(
  product: T,
  previewImageUrl: string | null
) {
  return {
    ...product,
    previewImageUrl,
    sourceFileUrl: product.sourceFileKey
      ? getSourceFileUrl(product.sourceFileKey)
      : null,
  };
}

// Public: paginated product listing
export const getProducts = query({
  args: {
    paginationOpts: paginationOptsValidator,
    isAdmin: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const result = args.isAdmin
      ? await ctx.db.query("products").order("desc").paginate(args.paginationOpts)
      : await ctx.db
          .query("products")
          .withIndex("by_published", (q) => q.eq("published", true))
          .order("desc")
          .paginate(args.paginationOpts);

    const page = await Promise.all(
      result.page.map(async (product) => {
        const previewImageUrl = await ctx.storage.getUrl(product.previewImage);
        return withUrls(product, previewImageUrl);
      })
    );

    return { ...result, page };
  },
});

// Public: get all published products (for listing page)
export const getAllProducts = query({
  args: { isAdmin: v.optional(v.boolean()) },
  handler: async (ctx, args) => {
    const products = args.isAdmin
      ? await ctx.db.query("products").order("desc").collect()
      : await ctx.db
          .query("products")
          .withIndex("by_published", (q) => q.eq("published", true))
          .order("desc")
          .collect();

    return Promise.all(
      products.map(async (product) => {
        const previewImageUrl = await ctx.storage.getUrl(product.previewImage);
        return withUrls(product, previewImageUrl);
      })
    );
  },
});

// Public: get single product by slug
export const getProductBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const product = await ctx.db
      .query("products")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (!product) return null;

    const previewImageUrl = await ctx.storage.getUrl(product.previewImage);
    return withUrls(product, previewImageUrl);
  },
});

// Admin: get single product by ID (for edit page)
export const getProductById = query({
  args: { productId: v.id("products") },
  handler: async (ctx, args) => {
    await assertAdmin(ctx);
    const product = await ctx.db.get(args.productId);
    if (!product) return null;
    const previewImageUrl = await ctx.storage.getUrl(product.previewImage);
    return withUrls(product, previewImageUrl);
  },
});

// Admin: create product
export const createProduct = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    description: v.string(),
    price: v.number(),
    previewImage: v.id("_storage"),
    tags: v.array(v.string()),
    categories: v.array(v.string()),
    language: v.string(),
    published: v.boolean(),
    version: v.string(),
    sourceFileKey: v.optional(v.string()),
    sourceFileName: v.optional(v.string()),
    creemProductId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await assertAdmin(ctx);

    const existing = await ctx.db
      .query("products")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    if (existing) throw new ConvexError("Slug already exists");

    return await ctx.db.insert("products", { ...args, downloads: 0 });
  },
});

// Admin: update product
export const updateProduct = mutation({
  args: {
    productId: v.id("products"),
    title: v.string(),
    slug: v.string(),
    description: v.string(),
    price: v.number(),
    previewImage: v.id("_storage"),
    tags: v.array(v.string()),
    categories: v.array(v.string()),
    language: v.string(),
    published: v.boolean(),
    version: v.string(),
    sourceFileKey: v.optional(v.string()),
    sourceFileName: v.optional(v.string()),
    creemProductId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await assertAdmin(ctx);

    const product = await ctx.db.get(args.productId);
    if (!product) throw new ConvexError("Product not found");

    const slugConflict = await ctx.db
      .query("products")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    if (slugConflict && slugConflict._id !== args.productId) {
      throw new ConvexError("Slug already exists");
    }

    const { productId, ...updates } = args;
    await ctx.db.patch(productId, updates);
    return productId;
  },
});

// Admin: delete product (also cleans up R2 source file via deleteSourceFile mutation)
export const deleteProduct = mutation({
  args: { productId: v.id("products") },
  handler: async (ctx, args) => {
    await assertAdmin(ctx);

    const product = await ctx.db.get(args.productId);
    if (!product) throw new ConvexError("Product not found");

    await ctx.storage.delete(product.previewImage);
    // Note: call api.r2.deleteSourceFile separately if sourceFileKey exists
    await ctx.db.delete(args.productId);
  },
});

// Admin: list all orders
export const getOrders = query({
  args: {},
  handler: async (ctx) => {
    await assertAdmin(ctx);
    return await ctx.db.query("orders").order("desc").collect();
  },
});
