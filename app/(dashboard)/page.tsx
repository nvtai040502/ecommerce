import Carousel from '@/components/carousel/product';
import Header from '@/components/header';
import { siteConfig } from '@/config/site';
import { getGitHubStars } from '@/lib/getGithubStars';
import { getCollectionProducts, getCollections } from '@/lib/shopify';
import Link from 'next/link';
export default async function Home() {
  const collections = await getCollections()
  const twoCollections = collections.slice(0, 2);
  const githubStars = await getGitHubStars()
  return (
    <div>

      <Header />

      {collections.map((collection, i) => (
        <div key={i}>
          <Carousel  collection={collection}/>
        </div>
      ))}
    </div>
  );
}