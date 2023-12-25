import ProductCarousel from '@/components/carousel/product';
import Carousel from '@/components/carousel/product';
import Header from '@/components/header';
import { siteConfig } from '@/config/site';
import { getGitHubStars } from '@/lib/getGithubStars';
import { getCollectionProducts, getCollections} from '@/lib/shopify';
import Link from 'next/link';

export const runtime = 'edge';

export default async function Home() {
  const collections = await getCollections()
  const twoCollections = collections.slice(0, 2);
  return (
    <div>
      <Header />

      {collections.map( async (collection, i) => {
        const products = await getCollectionProducts({collection: collection.handle})
        return (
          <ProductCarousel products={products} key={i} />
        )
      })}
    </div>
  );
}