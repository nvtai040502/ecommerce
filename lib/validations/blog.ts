import * as z from "zod"


export const frontMatterSchema = z.object({
  title: z.string(),
  date: z.string(),
  thumbnailUrl: z.string(),

  author: z.string().optional(),
  description: z.string().optional(),
})

export const authorSchema = z.object({
  name: z.string(),
  avatar: z.string(),
  twitter: z.string(),
})

