import Image from "next/image"
import Link from "next/link"

import { formatDate } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlaceholderImage } from "@/components/placeholder-image"
import { Post } from "@/types"
import { frontMatterSchema } from "@/lib/validations/blog"

interface PostCardProps {
  post: Post
  i: number
}

export function PostCard({ post, i }: PostCardProps) {
  const {
    title,
    thumbnailUrl,
    description,
    date
  } = frontMatterSchema.parse(post.frontMatter)
  return (
    <Link key={post.slug} href={'/blog/' + post.slug}>
      <span className="sr-only">{title}</span>
      <article className="space-y-4">
        <AspectRatio ratio={16 / 9}>
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            sizes="(min-width: 1024px) 384px, (min-width: 768px) 288px, (min-width: 640px) 224px, 100vw"
            className="rounded-lg object-cover"
            priority={i <= 1}
          />
        </AspectRatio>
        <div className="space-y-2">
          <CardHeader className="space-y-2.5 p-0">
            <CardTitle className="line-clamp-1">{title}</CardTitle>
            {description && (
              <CardDescription className="line-clamp-2">
                {description}
              </CardDescription>
            )}
          </CardHeader>
          <CardDescription>{formatDate(date)}</CardDescription>
        </div>
      </article>
    </Link>
  )
}