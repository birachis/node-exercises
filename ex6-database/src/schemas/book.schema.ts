import { z } from "zod";

export const bookIdParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const createBookBodySchema = z.object({
  title: z.string().trim().min(2).max(180),
  isbn: z.string().trim().min(10).max(20),
  price: z.coerce.number().positive(),
  stock: z.coerce.number().int().min(0),
  userId: z.coerce.number().int().positive(),
});

export const updateBookBodySchema = createBookBodySchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: "At least one field must be provided" },
);

export const listBooksQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  title: z.string().trim().optional(),
  userId: z.coerce.number().int().positive().optional(),
  minPrice: z.coerce.number().nonnegative().optional(),
  maxPrice: z.coerce.number().nonnegative().optional(),
  inStock: z.coerce.boolean().optional(),
  sortBy: z.enum(["createdAt", "price", "title"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});
