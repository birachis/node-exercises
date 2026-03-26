import { date, z } from "zod";

export const createBookSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  isInstore: z.boolean().default(true),
  amountInStore: z.number().int().min(0, "Amount in store must be a non-negative integer").default(1),
});

export const updateBookSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long").optional(),
  isInstore: z.boolean().optional(),
  amountInStore: z.number().int().min(0, "Amount in store must be a non-negative integer").optional(),
});

export const getBooksQuerySchema = z.object({
  page: z.string().optional().transform((val) => (val ? parseInt(val) : 1)),
  limit: z.string().optional().transform((val) => (val ? parseInt(val) : 10)),
  name: z.string().optional(),
  isInStore: z.string().optional().transform((val) => (val === "true" ? true : val === "false" ? false : undefined)),
  sortBy: z.enum(["id", "name", "amountInStore", "createdAt", "updatedAt"]).optional().default("id"),
  sortOrder: z.enum(["asc", "desc"]).optional().default("asc"),
});
