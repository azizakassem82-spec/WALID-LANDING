import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getSettings = query({
    args: {},
    handler: async (ctx) => {
        const settings = await ctx.db.query("settings").first();
        if (settings) {
            return settings;
        }
        // Return default settings if not yet defined
        return {
            unitPrice: 3200,
            oldUnitPrice: 3900,
            googleSheetUrl: "",
            googleSheetNotEndedUrl: "",
            bannerEnabled: true,
            bannerMessage: "التوصيل متوفر إلى",
            facebookPixelId: "",
            facebookAccessToken: "",
            tiktokPixelId: "",
            deliveryPrices: {},
        };
    },
});

export const updateSettings = mutation({
    args: {
        unitPrice: v.number(),
        oldUnitPrice: v.number(),
        googleSheetUrl: v.string(),
        googleSheetNotEndedUrl: v.string(),
        bannerEnabled: v.boolean(),
        bannerMessage: v.string(),
        facebookPixelId: v.string(),
        facebookAccessToken: v.string(),
        tiktokPixelId: v.string(),
        deliveryPrices: v.record(
            v.string(),
            v.object({
                stop: v.union(v.number(), v.null()),
                dom: v.number(),
                note: v.optional(v.string()),
            })
        ),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db.query("settings").first();
        if (existing) {
            await ctx.db.patch(existing._id, args);
        } else {
            await ctx.db.insert("settings", args);
        }
    },
});
