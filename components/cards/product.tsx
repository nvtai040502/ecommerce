import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { Eye } from "lucide-react";
import { Product, ShopifyProduct } from "@/lib/shopify/types";
import { formatPrice } from "@/lib/format-price";
import Price from "../price";

export async function ProductCard({product}: {product: Product}) {
  const amount = product.priceRange.maxVariantPrice.amount
  const currencyCode = product.priceRange.maxVariantPrice.currencyCode
  return (
    <Card>
      <Link href={`/product/${product.handle}`}>
        <CardHeader className="p-0">
          <AspectRatio ratio={4 / 3}>
            <Image
              src={ product.featuredImage ? product.featuredImage.url : "/example.png"}
              alt={product.title}
              className="object-cover"
              sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              fill
            />
          
          </AspectRatio>
        </CardHeader>
        <span className="sr-only">{product.title}</span>
        <CardContent className="space-y-1.5 p-4 ">
          <CardTitle className="line-clamp-1">{product.title}</CardTitle>
          <CardDescription className="line-clamp-1">
            <Price amount={amount} currencyCode={currencyCode} />
          </CardDescription>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-1">
        <div className="flex w-full items-center space-x-2">
          <Button
            aria-label="Add to cart"
            size="sm"
            className="h-8 w-full rounded-sm"
          >
            Add to cart
          </Button>
          <Link
            href={`/preview/product/${product.id}`}
            title="Preview"
            className={cn(
              buttonVariants({
                variant: "secondary",
                size: "icon",
                className: "h-8 w-8 shrink-0",
              })
            )}
          >
            <Eye className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">Preview</span>
          </Link>
        </div>
        
      </CardFooter>
    </Card>

  )
}
