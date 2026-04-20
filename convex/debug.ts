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
