import { VariantSelector } from './variant-selector';
import { AddToCart } from '../cart/add-to-cart';
import Price from '../price';
import Prose from '../prose';
import { Product } from '@/lib/shopify/types';
import { AddToCartForm } from '../forms/add-to-cart-form';

export function ProductDescription({ product }: { product: Product }) {
  // console.log(product.options)
  // console.log("Variant:", product.variants)
  // console.log("Select Options:", product.variants[0].selectedOptions)
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
        <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div>
      <VariantSelector options={product.options} variants={product.variants} />

      {product.descriptionHtml ? (
        <Prose
          className="mb-6 text-sm leading-tight dark:text-white/[60%]"
          html={product.descriptionHtml}
        />
      ) : null}

      <AddToCartForm variants={product.variants} availableForSale={product.availableForSale} showQuality={true}/>
    </>
  );
}