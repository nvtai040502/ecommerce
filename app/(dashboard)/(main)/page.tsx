import CollectionCarousel from '@/components/carousel/collection';
import ProductCarousel from '@/components/carousel/product';
import Header from '@/components/header';
import { getCollectionProducts, getCollections } from '@/lib/shopify';
import { CollectionWithProducts } from '@/lib/shopify/types';
import Link from 'next/link';

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

  return (
    <div className='p-4 mx-auto'>
      <Header />
      <CollectionCarousel collections={collectionsWithProducts} />

      {collectionsWithProducts.map((collection, i) => (
        <ProductCarousel key={i} products={collection.products} />
      ))}
    </div>
  );
}
