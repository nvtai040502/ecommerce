"use client"
import {
  Carousel as CarouselShadcn,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { getCollectionProducts } from "@/lib/shopify";
import { cn } from "@/lib/utils";
import { Collection, Product } from "@/lib/shopify/types";
import { ProductCard } from "../cards/product";
const ProductCarousel = ({products}: {products: Product[]}) => {
  if (!products?.length) return null;
  return ( 
    <CarouselShadcn className="w-full lg:max-w-4xl xl:max-w-6xl md:max-w-2xl max-w-xs">
      <CarouselContent className="-ml-1">
        {products.map((product, i) => (
          <CarouselItem key={i} className={cn(
            'bg-white hover:border-blue-600 dark:bg-black lg:basis-1/4 md:basis-1/3')}
          >
            <ProductCard
              product={product}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </CarouselShadcn>
   );
}
 
export default ProductCarousel;