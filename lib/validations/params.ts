import * as z from "zod"


export const searchParamsSchema = z.object({
  page: z.string().default("1"),
  sort: z.string().optional(),
  collection: z.string().optional()
})