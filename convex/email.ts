"use node";

import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_SMTP_USER,
    pass: process.env.ZOHO_SMTP_PASS,
  },
});

const FROM_ADDRESS = process.env.ZOHO_FROM_EMAIL || process.env.ZOHO_SMTP_USER;
const FROM_HEADER = FROM_ADDRESS ? `"Asraful Islam" <${FROM_ADDRESS}>` : undefined;

function emailWrapper(bodyHtml: string): string {
  return `
    <div style="font-family: -apple-system, Arial, sans-serif; max-width: 480px; margin: 0 auto; color: #1a1a1a;">
      ${bodyHtml}
      <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;" />
      <p style="font-size: 12px; color: #888;">
        Asraful Islam · asrafulislam.uk<br />
        You're receiving this because you made a purchase or requested it on our site.
      </p>
    </div>
  `;
}

export const sendPurchaseEmail = internalAction({
  args: {
    buyerEmail: v.string(),
    orderToken: v.string(),
    products: v.array(
      v.object({
        title: v.string(),
        downloadUrl: v.union(v.string(), v.null()),
      })
    ),
  },
  handler: async (ctx, args) => {
    if (!process.env.ZOHO_SMTP_USER || !process.env.ZOHO_SMTP_PASS) {
      console.error(
        "ZOHO_SMTP_USER / ZOHO_SMTP_PASS not set on this Convex deployment — skipping purchase email"
      );
      return;
    }

    const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";
    const orderUrl = `${siteUrl}/checkout/success?token=${args.orderToken}`;

    const linesHtml = args.products
      .map((p) =>
        p.downloadUrl
          ? `<li><strong>${p.title}</strong> — <a href="${p.downloadUrl}">Download</a></li>`
          : `<li><strong>${p.title}</strong> — file pending, check back soon</li>`
      )
      .join("");

    const linesText = args.products
      .map((p) =>
        p.downloadUrl
          ? `${p.title}: ${p.downloadUrl}`
          : `${p.title}: file pending, check back soon`
      )
      .join("\n");

    await transporter.sendMail({
      from: FROM_HEADER,
      to: args.buyerEmail,
      subject: "Your download is ready",
      text: `Thanks for your purchase!\n\n${linesText}\n\nYou can also revisit your order anytime here: ${orderUrl}`,
      html: emailWrapper(`
        <p>Thanks for your purchase! Here's your download:</p>
        <ul>${linesHtml}</ul>
        <p>You can revisit this order anytime here: <a href="${orderUrl}">View my order</a></p>
      `),
    });
  },
});

// A one-time product sold to someone else first. Tells the buyer, and tells
// the store owner which Creem order to refund.
export const sendSaleConflictEmail = internalAction({
  args: {
    buyerEmail: v.string(),
    productTitle: v.string(),
    creemOrderId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (!process.env.ZOHO_SMTP_USER || !process.env.ZOHO_SMTP_PASS) {
      console.error(
        `Refund needed for ${args.productTitle}, order ${args.creemOrderId}, but email is not configured`
      );
      return;
    }

    await transporter.sendMail({
      from: FROM_HEADER,
      to: args.buyerEmail,
      subject: "Your order will be refunded",
      text: `${args.productTitle} was a one-time sale and another buyer completed payment first. You will be refunded in full.`,
      html: emailWrapper(`
        <p><strong>${args.productTitle}</strong> was a one-time sale and another buyer completed payment first.</p>
        <p>You will be refunded in full.</p>
      `),
    });

    if (FROM_ADDRESS) {
      await transporter.sendMail({
        from: FROM_HEADER,
        to: FROM_ADDRESS,
        subject: `Refund needed: ${args.productTitle}`,
        text: `Refund Creem order ${args.creemOrderId ?? "(unknown)"} for ${args.buyerEmail}. The product had already sold.`,
      });
    }
  },
});

export const sendOrderLookupEmail = internalAction({
  args: {
    email: v.string(),
    lookupToken: v.string(),
  },
  handler: async (ctx, args) => {
    if (!process.env.ZOHO_SMTP_USER || !process.env.ZOHO_SMTP_PASS) {
      console.error(
        "ZOHO_SMTP_USER / ZOHO_SMTP_PASS not set on this Convex deployment — skipping order lookup email"
      );
      return;
    }

    const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";
    const lookupUrl = `${siteUrl}/orders?token=${args.lookupToken}`;

    await transporter.sendMail({
      from: FROM_HEADER,
      to: args.email,
      subject: "Here's your order lookup link",
      text: `Here's your order lookup link (valid for 24 hours): ${lookupUrl}`,
      html: emailWrapper(`
        <p>Click below to view your paid orders and download links. This link is valid for 24 hours.</p>
        <p><a href="${lookupUrl}">View my orders</a></p>
      `),
    });
  },
});
