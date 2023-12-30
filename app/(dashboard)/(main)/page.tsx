import { ProductCard } from '@/components/cards/product';
import CollectionCarousel from '@/components/carousel/collection';
import ProductCarousel from '@/components/carousel/product';
import Header from '@/components/header';
import { Icons } from '@/components/icons';
import { ProductCardSkeleton } from '@/components/skeletons/product-card';
import { buttonVariants } from '@/components/ui/button';
import { getCollectionProducts, getCollections, getProducts } from '@/lib/shopify';
import { CollectionWithProducts } from '@/lib/shopify/types';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import Balancer from 'react-wrap-balancer';

export default async function Home() {
  const collections = await getCollections();
  const twoCollections = collections.slice(0, 2);
  const collectionsWithProducts: CollectionWithProducts[] = await Promise.all(
    collections.map(async (collection) => {
      const { products } = await getCollectionProducts({ collection: collection.handle, first: 100 });
      return {
        ...collection,
        products,
      };
    })
  );

  const someCollectionsWithProducts = collectionsWithProducts.slice(0, 2)

  return (
    <div className='p-4 mx-auto'>
      <Header />
      <div className="max-w-[58rem] flex-1 space-y-1">
        <h2 className="font-heading text-3xl font-bold mb-4 md:text-4xl">
          Collections
        </h2>
      </div>
      <CollectionCarousel collections={collectionsWithProducts} />

      <section
        id="featured-products"
        aria-labelledby="featured-products-heading"
        className="space-y-6 pt-8 md:pt-10 lg:pt-12"
      >
        <div className="flex items-center gap-4">
          <div className="max-w-[58rem] flex-1 space-y-1">
            <h2 className="font-heading text-3xl font-bold leading-[1.1] md:text-4xl">
              Featured products
            </h2>
            <Balancer className="max-w-[46rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Explore products from around the world
            </Balancer>
          </div>
          <Link
            href="/products"
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "hidden sm:flex",
              })
            )}
          >
            View all products
            <Icons.arrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            <span className="sr-only">View all products</span>
          </Link>
        </div>
        {someCollectionsWithProducts.map((collection, i) => (
          <ProductCarousel key={i} products={collection.products} collectionTitle={collection.title} />
        ))}
      </section>

      
    </div>
  );
}
