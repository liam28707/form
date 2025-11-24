import { mutation } from "./_generated/server";
import bcrypt from "bcryptjs";

type WorkerInput = {
    fullName: string;
    age?: number | null;
    email: string;
    phone: string;
    address: string;
    worksite?: string | null;
    password: string;
};

export const registerWorker = mutation(async ({ db }, input: WorkerInput) => {
    if (!input.fullName || !input.fullName.trim()) {
        throw new Error("fullName is required");
    }
    if (!input.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
        throw new Error("A valid email is required");
    }
    if (!input.password || input.password.length < 8) {
        throw new Error("Password must be at least 8 characters");
    }

    const passwordHash = bcrypt.hashSync(input.password, 10);

    const doc = {
        fullName: input.fullName.trim(),
        age: typeof input.age === "number" ? input.age : null,
        email: input.email.trim().toLowerCase(),
        phone: input.phone || "",
        address: input.address || "",
        worksite: input.worksite || "",
        passwordHash,
        createdAt: Date.now(),
    } as const;
    const id = await db.insert("workers", doc as any);
    return { id };
});