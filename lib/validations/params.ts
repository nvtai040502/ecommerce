import * as z from "zod"


export const searchParamsSchema = z.object({
  page: z.string().default("1"),
  per_page: z.string().default("12"),
  sort: z.string().optional()
})