import { httpRouter } from "convex/server";
import { auth } from "./auth";
import { creem } from "./billing";
import { getEventData } from "@mmailaender/convex-creem";
import { internal } from "./_generated/api";

const http = httpRouter();

auth.addHttpRoutes(http);

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
