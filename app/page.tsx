import { getCollectionProducts } from '@/lib/shopify';

export default async function Carousel() {
  const products = await getCollectionProducts({ collection: 'test' });

  if (!products?.length) return null;


  return (
    <div>
      {products.length}
      <ul>
        {products.map((product, i) => (
          <li
            key={`${product.handle}${i}`}
          >
            <div>
              {product.title}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}