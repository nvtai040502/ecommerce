"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { Eye } from "lucide-react";
import { Product, ShopifyProduct } from "@/lib/shopify/types";
import Price from "../price";

import { useState, useEffect } from 'react'
import { AddToCartForm } from "../forms/add-to-cart-form";
 
  
interface ProductCardProps {
  product: Product
  collectionTitle?: string
}
export function ProductCard({product, collectionTitle}: ProductCardProps) {
  const [isClick, setIsClick] = useState(false)
 
  useEffect(() => {
    setIsClick(true)
  }, [])

  if (!isClick) return null

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
          {collectionTitle && (
            <CardDescription className="line-clamp-1">
              {collectionTitle}
            </CardDescription>  
          )}
          <CardDescription className="line-clamp-1">
            <Price amount={amount} currencyCode={currencyCode} />
          </CardDescription>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-1">
        <div className="flex w-full items-center space-x-2">
          <AddToCartForm variants={product.variants} availableForSale={product.availableForSale} showQuality={false}/>
        </div>
        
      </CardFooter>
    </Card>

  )
}
