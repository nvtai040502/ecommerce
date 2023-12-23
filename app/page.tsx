import Carousel from '@/components/carousel/product';
import { getCollectionProducts, getCollections } from '@/lib/shopify';
export default async function Home() {
  const collections = await getCollections()
  const twoCollections = collections.slice(0, 2);

  return (
    <div className=' '>
      hello {twoCollections.length}
      {twoCollections.map((co, i) => (
        <div key={i}>
          <Carousel collection={co}/>
        </div>
      ))}
     
      
    </div>
  );
}