import { mutation } from "./_generated/server";

export const forceResetPassword = mutation({
    args: {},
    handler: async (ctx) => {
        const existing = await ctx.db.query("settings").first();
        if (existing) {
            await ctx.db.patch(existing._id, { adminPassword: "NACERADMIN", unitPrice: 4900 });
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
                adminPassword: "NACERADMIN",
                deliveryPrices: [],
            });
        }
    },
});
export const syncProductionPixel = mutation({
    args: {},
    handler: async (ctx) => {
        const existing = await ctx.db.query("settings").first();
        const pixelParams = {
            facebookPixelId: "1612297379997971",
            facebookPixelIds: ["1612297379997971"]
        };
        if (existing) {
            await ctx.db.patch(existing._id, pixelParams);
        } else {
            await ctx.db.insert("settings", {
                unitPrice: 4900,
                oldUnitPrice: 3900,
                googleSheetUrl: "",
                googleSheetNotEndedUrl: "",
                bannerEnabled: true,
                bannerMessage: "التوصيل متوفر إلى",
                facebookPixelId: "1612297379997971",
                facebookPixelIds: ["1612297379997971"],
                facebookAccessToken: "",
                tiktokPixelId: "",
                adminPassword: "NACERADMIN",
                deliveryPrices: [],
            });
        }
    },
});
