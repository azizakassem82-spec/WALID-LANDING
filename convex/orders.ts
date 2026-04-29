import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// ─── Create / upsert an order ─────────────────────────────────────────────────

/** Insert a completed order */
export const createOrder = mutation({
  args: {
    name: v.string(),
    phone: v.string(),
    wilaya: v.string(),
    address: v.optional(v.string()),
    productName: v.optional(v.string()),
    qty: v.number(),
    total: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("orders", {
      ...args,
      status: "new",
      isNotEnded: false,
      isSuspect: false,
      createdAt: Date.now(),
    });
  },
});

/** Insert or ignore a "not-ended" lead (phone only, called on blur) */
export const createNotEndedLead = mutation({
  args: {
    name: v.optional(v.string()),
    phone: v.string(),
    productName: v.optional(v.string()),
  },
  handler: async (ctx, { name, phone, productName }) => {
    // Don't duplicate leads for the same phone
    const existing = await ctx.db
      .query("orders")
      .withIndex("by_phone", (q) => q.eq("phone", phone))
      .first();
    if (existing) return existing._id;

    return await ctx.db.insert("orders", {
      name: name || "—",
      phone,
      wilaya: "—",
      productName,
      qty: 0,
      total: 0,
      status: "lead",
      isNotEnded: true,
      isSuspect: false,
      createdAt: Date.now(),
    });
  },
});

// ─── Queries ──────────────────────────────────────────────────────────────────

/** All completed orders (not leads), newest first */
export const listOrders = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("orders")
      .withIndex("by_not_ended", (q) => q.eq("isNotEnded", false))
      .order("desc")
      .collect();
  },
});

/** All "not-ended" leads, newest first */
export const listLeads = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("orders")
      .withIndex("by_not_ended", (q) => q.eq("isNotEnded", true))
      .order("desc")
      .collect();
  },
});

/** Stats for the dashboard */
export const stats = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("orders").collect();
    const orders = all.filter((o) => !o.isNotEnded);
    const leads = all.filter((o) => o.isNotEnded);
    const revenue = orders
      .filter((o) => o.status !== "cancelled")
      .reduce((s, o) => s + o.total, 0);
    const pending = orders.filter((o) => o.status === "new").length;
    const delivered = orders.filter((o) => o.status === "delivered").length;
    return { totalOrders: orders.length, totalLeads: leads.length, revenue, pending, delivered };
  },
});

// ─── Update order status ──────────────────────────────────────────────────────

export const updateStatus = mutation({
  args: { id: v.id("orders"), status: v.string() },
  handler: async (ctx, { id, status }) => {
    await ctx.db.patch(id, { status });
  },
});
