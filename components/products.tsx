"use client"

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Collection, Product } from "@/lib/shopify/types"
import { sorting } from "@/lib/constants"
import { cn, createUrl } from "@/lib/utils"
import { ProductCard } from "./cards/product"
import { Icons } from "./icons"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Label } from "./ui/label"
import { Separator } from "./ui/separator"
import { Card, CardDescription } from "./ui/card"
import { Switch } from "./ui/switch"
import { Slider } from "./ui/slider"
import { Input } from "./ui/input"

interface ProductsProps {
  products: Product[]
  collections?: Collection[]
}

export function Products({
  products,
  collections
}: ProductsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = React.useTransition()
  const sort = searchParams.get("sort")
  const collection_param = searchParams.get("collection")

  return (
    <section className="flex flex-col space-y-6">
      <div className="flex items-center space-x-2">
        {collections && (
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-label="Filter products" size="sm" disabled={isPending}>
              Filter
              <Icons.chevronDown className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuLabel>Collections</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
                className={cn(!collection_param && "bg-accent font-bold")}
                onClick={() => {
                  startTransition(() => {
                    const newSearchParams = new URLSearchParams(searchParams);
                    newSearchParams.set("page", "1");
                    newSearchParams.delete("collection")
                    router.push(createUrl(pathname, newSearchParams));
                  })
                }}
              >
                All 
              </DropdownMenuItem>
            {collections.map((collection, i) => (
              <DropdownMenuItem
                key={i}
                className={cn(collection.title === collection_param && "bg-accent font-bold")}
                onClick={() => {
                  startTransition(() => {
                    const newSearchParams = new URLSearchParams(searchParams);
                    newSearchParams.set("page", "1");
                    newSearchParams.set('collection', collection.title);
                    router.push(createUrl(pathname, newSearchParams));
                  })
                }}
              >
                {collection.title} 
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        )}
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-label="Sort products" size="sm" disabled={isPending}>
              Sort
              <Icons.chevronDown className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {sorting.map((item, i) => (
              <DropdownMenuItem
                key={i}
                className={cn(item.slug === sort && "bg-accent font-bold")}
                onClick={() => {
                  startTransition(() => {
                    const newSearchParams = new URLSearchParams(searchParams);
                    if (item.slug) {
                      newSearchParams.set('sort', item.slug);
                    } else {
                      newSearchParams.delete('sort');
                    }
                    router.push(createUrl(pathname, newSearchParams));
                  })
                }}
              >
                {item.title}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
     
      
    </section>
  )
}