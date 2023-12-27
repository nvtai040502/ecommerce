import ProductCarousel from '@/components/carousel/product';
import Header from '@/components/header';
import getCurrentUser from '@/lib/auth/getCurrentUser';
import { getCollectionProducts, getCollections} from '@/lib/shopify';
import Link from 'next/link';

export default async function Home() {
  const collections = await getCollections()
  const twoCollections = collections.slice(0, 2);
  const user = await getCurrentUser()
  return (
    <div>
      {user?.email}
      <Header />
      {collections.map( async (collection, i) => {
        const products = await getCollectionProducts({collection: collection.handle})
        return (
          <div key={i} className='p-4 mx-auto'>
            <ProductCarousel products={products} />
          </div>
        )
      })}
    </div>
  );
}