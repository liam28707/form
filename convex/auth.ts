import { action, internalAction } from "./_generated/server";
import { v } from "convex/values";
import bcrypt from "bcryptjs";

export const hashPassword = action({
  args: { password: v.string() },
  handler: async (_, { password }) => {
    const hashed = await bcrypt.hash(password, 10);
    return hashed;
  },
});
