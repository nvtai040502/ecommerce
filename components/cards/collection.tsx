"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { Eye } from "lucide-react";
import { Collection, Product, ShopifyProduct } from "@/lib/shopify/types";
import Price from "../price";

import { useState, useEffect } from 'react'
import { AddToCartForm } from "../forms/add-to-cart-form";
 
  

export function CollectionCard({collection, totalProducts}: {collection: Collection, totalProducts: number}) {
  const [isClick, setIsClick] = useState<boolean>(false)
  useEffect(() => {
    setIsClick(true)
  }, [])

  if (!isClick) return null

  return (
    <Card>
      <Link href={`/collection/${collection.handle}`}>
        <CardHeader className="p-0">
          <AspectRatio ratio={4 / 3}>
            <Image
              src={ collection.image ? collection.image.url : "/example.png"}
              alt={collection.title}
              className="object-cover"
              sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              fill
            />
          </AspectRatio>
        </CardHeader>
        <span className="sr-only">{collection.title}</span>
        <CardContent className="space-y-1.5 p-4 ">
          <CardTitle className="line-clamp-1">{collection.title}</CardTitle>
          <CardDescription className="line-clamp-1">
            {totalProducts} Products
          </CardDescription>
        </CardContent>
      </Link>
      
    </Card>

  )
}
