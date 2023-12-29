"use client"
import {
  Carousel as CarouselShadcn,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Collection, CollectionWithProducts, Product } from '@/lib/shopify/types';
import { ProductCard } from '../cards/product';
import { CollectionCard } from '../cards/collection';

interface CollectionCarouselProps {
  collections: CollectionWithProducts[] 
}

const CollectionCarousel: React.FC<CollectionCarouselProps> = ({ collections }) => {
  
  if (!collections.length) return null;

  return (
    <CarouselShadcn className="w-full">
      <CarouselContent className="-ml-1 ">
        {collections.map((collection, index) => {
          return (
          <CarouselItem key={index} className="pl-1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
            <CollectionCard collection={collection} totalProducts={collection.products.length}  key={index}/>
          </CarouselItem>

          )
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </CarouselShadcn>
  );
};

export default CollectionCarousel;
