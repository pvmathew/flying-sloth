import { z } from "zod";

export const createDocSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().optional(),
});

export type CreateDocSchema = z.infer<typeof createDocSchema>;
