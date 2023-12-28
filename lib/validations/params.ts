import * as z from "zod"

export const searchParamsSchema = z.object({
  page: z.string().default("1"),
  per_page: z.string().default("12"),
  from: z.string().optional(),
  to: z.string().optional(),
  sort: z.string().optional().default("createdAt.desc"),
})
export const productsSearchParamsSchema = searchParamsSchema
  .omit({ from: true, to: true })
  .extend({
    collections: z.string().optional(),
    price_range: z.string().optional(),
    availableForSale: z.string().optional().default("true"),
  })