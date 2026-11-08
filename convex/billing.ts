import { ConvexError, v } from "convex/values";
import {
  action,
  internalAction,
  internalMutation,
  internalQuery,
  mutation,
  query,
} from "./_generated/server";
import { internal, components } from "./_generated/api";
import { Creem } from "@mmailaender/convex-creem";
import { assertAdmin, normalizeEmail } from "./helpers";
import { getSourceFileUrl } from "./r2";

const LOOKUP_TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
const CHECKOUT_HOLD_MS = 20 * 60 * 1000; // 20 minutes

export const creem = new Creem(components.creem);

// Admin: list products already created in Creem, to link to a Convex product.
export const listCreemProducts = query({
  args: {},
  handler: async (ctx) => {
    await assertAdmin(ctx);
    return await creem.products.list(ctx);
  },
});

// Pull the product catalog from Creem into Convex's local cache.
// Run after creating/editing products in the Creem dashboard:
//   npx convex run billing:syncBillingProducts
export const syncBillingProducts = internalAction({
  args: {},
  handler: async (ctx) => {
    await creem.syncProducts(ctx);
  },
});

// Internal: fetch a product for the checkout action (actions can't touch ctx.db directly).
export const getProductForCheckout = internalQuery({
  args: { productId: v.id("products") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.productId);
  },
});

// Internal: create a pending order before redirecting to Creem's hosted checkout.
export const createPendingOrder = internalMutation({
  args: {
    token: v.string(),
    productId: v.id("products"),
    buyerEmail: v.string(),
    totalAmount: v.number(),
  },
  handler: async (ctx, args) => {
    // A mutation is atomic, so two buyers can't both take the same hold.
    const product = await ctx.db.get(args.productId);
    if (product?.oneTimeSale) {
      if (product.soldAt) throw new ConvexError("This product has been sold.");
      const buyer = normalizeEmail(args.buyerEmail);
      const heldByOther =
        (product.reservedUntil ?? 0) > Date.now() &&
        product.reservedFor !== buyer;
      if (heldByOther) {
        throw new ConvexError(
          "Someone is checking out right now. Try again in 20 minutes."
        );
      }
      await ctx.db.patch(args.productId, {
        reservedUntil: Date.now() + CHECKOUT_HOLD_MS,
        reservedFor: buyer,
      });
    }

    await ctx.db.insert("orders", {
      token: args.token,
      productIds: [args.productId],
      buyerEmail: normalizeEmail(args.buyerEmail),
      totalAmount: args.totalAmount,
      status: "pending",
    });
  },
});

// Internal: free a one-time product when its checkout could not be opened.
export const releaseCheckoutHold = internalMutation({
  args: { productId: v.id("products") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.productId, {
      reservedUntil: undefined,
      reservedFor: undefined,
    });
  },
});

// Internal: mark an order paid from the Creem webhook, bump the product's
// counter, and schedule a follow-up email with the download link(s).
export const markOrderPaid = internalMutation({
  args: { token: v.string(), creemOrderId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const order = await ctx.db
      .query("orders")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .unique();
    if (!order || order.status === "paid") return;

    // A hold can expire while a buyer is still on Creem's page. If someone
    // else paid first, this buyer gets a refund and no download.
    for (const productId of order.productIds) {
      const product = await ctx.db.get(productId);
      if (product?.oneTimeSale && product.soldAt) {
        await ctx.db.patch(order._id, {
          status: "refund_required",
          creemOrderId: args.creemOrderId,
        });
        await ctx.scheduler.runAfter(0, internal.email.sendSaleConflictEmail, {
          buyerEmail: order.buyerEmail,
          productTitle: product.title,
          creemOrderId: args.creemOrderId,
        });
        return;
      }
    }

    await ctx.db.patch(order._id, {
      status: "paid",
      creemOrderId: args.creemOrderId,
    });

    const convexSiteUrl = process.env.CONVEX_SITE_URL;

    const products = await Promise.all(
      order.productIds.map(async (productId) => {
        const product = await ctx.db.get(productId);
        if (!product) return null;
        await ctx.db.patch(productId, {
          downloads: (product.downloads ?? 0) + 1,
          ...(product.oneTimeSale
            ? {
                soldAt: Date.now(),
                reservedUntil: undefined,
                reservedFor: undefined,
              }
            : {}),
        });
        return {
          title: product.title,
          // Points at a live-resolving redirect (see http.ts "/download") rather
          // than a raw R2 URL, so the link in this email always serves whatever
          // file is currently on the product — even if it's replaced later.
          downloadUrl: convexSiteUrl
            ? `${convexSiteUrl}/download?token=${order.token}&productId=${productId}`
            : product.sourceFileKey
            ? getSourceFileUrl(product.sourceFileKey)
            : null,
        };
      })
    );

    await ctx.scheduler.runAfter(0, internal.email.sendPurchaseEmail, {
      buyerEmail: order.buyerEmail,
      orderToken: order.token,
      products: products.filter((p): p is NonNullable<typeof p> => p !== null),
    });
  },
});

// Internal: mark an order failed from the Creem webhook.
export const markOrderFailed = internalMutation({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const order = await ctx.db
      .query("orders")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .unique();
    if (!order || order.status === "paid") return;
    await ctx.db.patch(order._id, { status: "failed" });
  },
});

// Internal: resolve a (paid order token, productId) pair into the product's
// *current* source file URL, for the "/download" http route. Re-checked on
// every click, so it always reflects whatever file is on the product now.
export const resolveDownload = internalQuery({
  args: { token: v.string(), productId: v.id("products") },
  handler: async (ctx, args) => {
    const order = await ctx.db
      .query("orders")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .unique();
    if (!order || order.status !== "paid") return null;
    if (!order.productIds.includes(args.productId)) return null;

    const product = await ctx.db.get(args.productId);
    if (!product) return null;

    return {
      sourceFileUrl: product.sourceFileKey
        ? getSourceFileUrl(product.sourceFileKey)
        : null,
    };
  },
});

// Public: start a guest checkout for a single paid product.
// Creem's checkout session supports exactly one product per session, so the
// cart's "Pay" button calls this once per item rather than one combined charge.
export const startCheckout = action({
  args: {
    productId: v.id("products"),
    buyerEmail: v.string(),
  },
  handler: async (ctx, args): Promise<{ url: string }> => {
    const product = await ctx.runQuery(
      internal.billing.getProductForCheckout,
      { productId: args.productId }
    );
    if (!product) throw new Error("Product not found");
    if (!product.published) throw new Error("Product is not available");
    if (product.oneTimeSale && product.soldAt) {
      throw new ConvexError("This product has been sold.");
    }
    if (product.price <= 0) {
      throw new Error("This product is free — no checkout needed");
    }
    if (!product.creemProductId) {
      throw new Error("This product isn't configured for payment yet");
    }

    const token = crypto.randomUUID();
    await ctx.runMutation(internal.billing.createPendingOrder, {
      token,
      productId: args.productId,
      buyerEmail: args.buyerEmail,
      totalAmount: product.price,
    });

    const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";

    try {
      const { url } = await creem.checkouts.create(ctx, {
        entityId: args.buyerEmail,
        userId: args.buyerEmail,
        email: args.buyerEmail,
        productId: product.creemProductId,
        successUrl: `${siteUrl}/checkout/success?token=${token}`,
        metadata: { orderToken: token, convexProductId: args.productId },
      });
      return { url };
    } catch (error) {
      if (product.oneTimeSale) {
        await ctx.runMutation(internal.billing.releaseCheckoutHold, {
          productId: args.productId,
        });
      }
      throw error;
    }
  },
});

// Public: poll (reactively) an order's status + download link(s) on the success page.
export const getOrderByToken = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const order = await ctx.db
      .query("orders")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .unique();
    if (!order) return null;

    const products = (
      await Promise.all(
        order.productIds.map(async (id) => {
          const product = await ctx.db.get(id);
          if (!product) return null;
          return {
            productId: product._id,
            title: product.title,
            slug: product.slug,
            // Unpaid orders must not reveal the file.
            sourceFileUrl:
              order.status === "paid" && product.sourceFileKey
                ? getSourceFileUrl(product.sourceFileKey)
                : null,
          };
        })
      )
    ).filter((p): p is NonNullable<typeof p> => p !== null);

    return {
      status: order.status,
      totalAmount: order.totalAmount,
      buyerEmail: order.buyerEmail,
      products,
    };
  },
});

// Public: request a magic link listing all paid orders for an email.
// Always resolves the same way whether or not orders exist, so the response
// itself can't be used to check if an email has ever purchased anything.
export const requestOrderLookup = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const email = normalizeEmail(args.email);

    const orders = await ctx.db
      .query("orders")
      .withIndex("by_buyer_and_status", (q) =>
        q.eq("buyerEmail", email).eq("status", "paid")
      )
      .collect();

    if (orders.length === 0) return;

    const token = crypto.randomUUID();
    await ctx.db.insert("orderLookupTokens", {
      token,
      email,
      expiresAt: Date.now() + LOOKUP_TOKEN_TTL_MS,
    });

    await ctx.scheduler.runAfter(0, internal.email.sendOrderLookupEmail, {
      email,
      lookupToken: token,
    });
  },
});

// Public: resolve a magic-link token into the buyer's paid orders + downloads.
export const getOrdersByLookupToken = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const lookup = await ctx.db
      .query("orderLookupTokens")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .unique();
    if (!lookup || lookup.expiresAt < Date.now()) return null;

    const orders = await ctx.db
      .query("orders")
      .withIndex("by_buyer_and_status", (q) =>
        q.eq("buyerEmail", lookup.email).eq("status", "paid")
      )
      .order("desc")
      .collect();

    const ordersWithProducts = await Promise.all(
      orders.map(async (order) => {
        const products = (
          await Promise.all(
            order.productIds.map(async (id) => {
              const product = await ctx.db.get(id);
              if (!product) return null;
              return {
                title: product.title,
                slug: product.slug,
                sourceFileUrl: product.sourceFileKey
                  ? getSourceFileUrl(product.sourceFileKey)
                  : null,
              };
            })
          )
        ).filter((p): p is NonNullable<typeof p> => p !== null);

        return {
          orderId: order._id,
          createdAt: order._creationTime,
          totalAmount: order.totalAmount,
          products,
        };
      })
    );

    return { email: lookup.email, orders: ordersWithProducts };
  },
});
