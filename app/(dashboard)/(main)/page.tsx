import ProductCarousel from '@/components/carousel/product';
import Header from '@/components/header';
import { getCollectionProducts, getCollections} from '@/lib/shopify';
import Link from 'next/link';

export default async function Home() {
  const collections = await getCollections()
  const twoCollections = collections.slice(0, 2);
  return (
    <div>
      <Header />
      {collections.map( async (collection, i) => {
        const {products} = await getCollectionProducts({collection: collection.handle, first: 100})
        return (
          <div key={i} className='p-4 mx-auto'>
            <ProductCarousel products={products} />
          </div>
        )
      })}
    </div>
  );
}