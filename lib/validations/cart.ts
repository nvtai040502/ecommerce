import * as z from "zod"

export const updateCartItemSchema = z.object({
  quantity: z.number().min(1).default(1),
})