"use client"
import {
  Carousel as CarouselShadcn,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Collection, Product } from '@/lib/shopify/types';
import { ProductCard } from '../cards/product';

interface ProductCarouselProps {
  products: Product[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
  
  if (!products.length) return null;

  return (
    <CarouselShadcn className="w-full">
      <CarouselContent className="-ml-1 ">
        {products.map((product, index) => (
          <CarouselItem key={index} className="pl-1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
            <ProductCard product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </CarouselShadcn>
  );
};

export default ProductCarousel;
