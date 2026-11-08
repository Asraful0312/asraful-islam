import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { auth } from "./auth";
import { creem } from "./billing";
import { getEventData } from "@mmailaender/convex-creem";
import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";

const http = httpRouter();

auth.addHttpRoutes(http);

// Live download redirect used by purchase emails: <CONVEX_SITE_URL>/download?token=...&productId=...
// Resolved fresh on every click, so it always serves whatever file currently
// sits on the product, even if it was replaced after the order was placed.
http.route({
  path: "/download",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    const url = new URL(request.url);
    const token = url.searchParams.get("token");
    const productId = url.searchParams.get("productId");
    if (!token || !productId) {
      return new Response("Missing token or productId", { status: 400 });
    }

    const result = await ctx.runQuery(internal.billing.resolveDownload, {
      token,
      productId: productId as Id<"products">,
    });

    const siteUrl = process.env.SITE_URL ?? "https://asrafulislam.uk";

    if (!result) {
      return Response.redirect(`${siteUrl}/orders`, 302);
    }
    if (!result.sourceFileUrl) {
      return new Response(
        "This file isn't uploaded yet — check back soon or contact support.",
        { status: 404 }
      );
    }

    return Response.redirect(result.sourceFileUrl, 302);
  }),
});

// Webhook endpoint: <CONVEX_SITE_URL>/creem/events
creem.registerRoutes(http, {
  events: {
    "checkout.completed": async (ctx, event) => {
      const data = getEventData(event) as
        | { id?: string; metadata?: Record<string, unknown> }
        | undefined;
      const orderToken = data?.metadata?.orderToken;
      if (typeof orderToken !== "string") return;

      await ctx.runMutation(internal.billing.markOrderPaid, {
        token: orderToken,
        creemOrderId: typeof data?.id === "string" ? data.id : undefined,
      });
    },
  },
});

export default http;
