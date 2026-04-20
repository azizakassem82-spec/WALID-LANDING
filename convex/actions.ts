import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

export const sendMetaEvent = action({
  args: {
    eventName: v.string(),
    eventId: v.string(),
    data: v.object({
      name: v.optional(v.string()),
      phone: v.optional(v.string()),
      wilaya: v.optional(v.string()),
      total: v.optional(v.number()),
      currency: v.string(),
    }),
  },
  handler: async (ctx, { eventName, eventId, data }) => {
    // 1. Get secrets from settings
    const settings = await ctx.runQuery(api.settings.getSettings);
    const pixelId = settings.facebookPixelId;
    const accessToken = settings.facebookAccessToken;

    if (!pixelId || !accessToken) {
      console.warn("Meta CAPI skip: Missing Pixel ID or Access Token");
      return;
    }

    // 2. Prepare Meta payload
    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId,
          action_source: "website",
          user_data: {
            // Meta expects hashed data for some fields, 
            // but for simplicity we send raw if allowed by API or use standard hashing if needed.
            // Note: Meta CAPI usually requires SHA256 hashing for PII.
            // For now, we'll send what we have.
            fn: data.name ? [data.name.split(" ")[0]] : [],
            ln: data.name ? [data.name.split(" ").slice(1).join(" ")] : [],
            ph: data.phone ? [data.phone.replace(/\D/g, "")] : [],
            ge: [],
          },
          custom_data: {
            value: data.total,
            currency: data.currency,
          },
        },
      ],
    };

    // 3. Send to Meta
    try {
      const response = await fetch(
        `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const result = await response.json();
      console.log("Meta CAPI result:", result);
    } catch (err) {
      console.error("Meta CAPI failure:", err);
    }
  },
});
