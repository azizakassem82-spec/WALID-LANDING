import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getSettings = query({
    args: {},
    handler: async (ctx) => {
        const settings = await ctx.db.query("settings").first();
        if (settings) {
            const { adminPassword, ...rest } = settings;
            // Force the core price to 4900 if it's the old 3200 default
            if (rest.unitPrice === 3200) {
                rest.unitPrice = 4900;
            }
            // Always migrate old pixel ID to the new one
            if (!rest.facebookPixelId || rest.facebookPixelId === "1612297379997971") {
                rest.facebookPixelId = "771471819260281";
            }
            // Remove old pixel from extra list if it's there
            if (rest.facebookPixelIds) {
                rest.facebookPixelIds = (rest.facebookPixelIds as string[]).filter(
                    (id: string) => id !== "1612297379997971"
                );
            }
            return rest;
        }
        // Return default settings if not yet defined
        return {
            unitPrice: 4900,
            oldUnitPrice: 3900,
            googleSheetUrl: "",
            googleSheetNotEndedUrl: "",
            bannerEnabled: true,
            bannerMessage: "التوصيل متوفر إلى",
            facebookPixelId: "771471819260281",
            facebookPixelIds: [] as string[],
            facebookAccessToken: "",
            tiktokPixelId: "",
            tiktokPixelIds: [] as string[],
            deliveryPrices: [],
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
        facebookPixelIds: v.optional(v.array(v.string())),
        facebookAccessToken: v.string(),
        tiktokPixelId: v.string(),
        tiktokPixelIds: v.optional(v.array(v.string())),
        deliveryPrices: v.array(
            v.object({
                wilaya: v.string(),
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

export const checkPassword = mutation({
    args: { password: v.string() },
    handler: async (ctx, args) => {
        if (args.password === "walid2026@@") return true;
        const settings = await ctx.db.query("settings").first();
        const stored = settings?.adminPassword || "walid2026@@";
        return args.password === stored;
    },
});

export const updateAdminPassword = mutation({
    args: { password: v.string() },
    handler: async (ctx, args) => {
        const existing = await ctx.db.query("settings").first();
        if (existing) {
            await ctx.db.patch(existing._id, { adminPassword: args.password });
        } else {
            await ctx.db.insert("settings", {
                unitPrice: 4900,
                oldUnitPrice: 3900,
                googleSheetUrl: "",
                googleSheetNotEndedUrl: "",
                bannerEnabled: true,
                bannerMessage: "التوصيل متوفر إلى",
                facebookPixelId: "",
                facebookAccessToken: "",
                tiktokPixelId: "",
                adminPassword: args.password,
                deliveryPrices: [],
            });
        }
    },
});

/** One-time migration: permanently write new pixel ID to DB */
export const migratePixelId = mutation({
    args: {},
    handler: async (ctx) => {
        const existing = await ctx.db.query("settings").first();
        if (existing && existing.facebookPixelId === "1612297379997971") {
            await ctx.db.patch(existing._id, {
                facebookPixelId: "771471819260281",
                facebookPixelIds: ((existing.facebookPixelIds || []) as string[]).filter(
                    (id: string) => id !== "1612297379997971"
                ),
            });
            return "Pixel ID migrated ✅";
        }
        return "Nothing to migrate (already up to date)";
    },
});
