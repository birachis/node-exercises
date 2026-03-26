import { z } from "zod";

export const userIdParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const createUserBodySchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
});

export const updateUserBodySchema = createUserBodySchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: "At least one field must be provided" },
);

export const listUsersQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().trim().optional(),
});
