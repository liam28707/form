import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Schema for SmartLife — worker registrations
// Put this file at `convex/schema.ts` so Convex codegen picks it up.
export default defineSchema({
  workers: defineTable({
    // Basic identity
    fullName: v.string(),
    // Age is optional (allow empty / unknown)
    age: v.optional(v.number()),
    // Contact
    email: v.string(),
    phone: v.string(),
    address: v.string(),
    // Optional worksite or department
    worksite: v.optional(v.string()),

    // Server-side hashed password (never store plaintext)
    passwordHash: v.string(),

    // Timestamp stored as epoch milliseconds
    createdAt: v.number(),
  }),
});
