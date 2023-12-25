import Link from 'next/link';
import Grid from '../grid';
import { Product, ShopifyProduct } from '@/lib/shopify/types';
import { ProductCard } from '../cards/product';

export default function ProductGridItems({ products }: { products: Product[] }) {
  return (
    <>
      {products.map((product) => (
        <Grid.Item key={product.handle} className="animate-fadeIn">
          <Link className="relative inline-block h-full w-full" href={`/product/${product.handle}`}>
            <ProductCard product={product} />
          </Link>
        </Grid.Item>
      ))}
    </>
  );
}