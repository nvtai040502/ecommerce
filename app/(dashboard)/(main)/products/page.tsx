import Grid from "@/components/grid";
import ProductGridItems from "@/components/layout/product-grid-items";
import { getProducts } from "@/lib/shopify";

const ProductsPage = async ({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const { q: searchValue } = searchParams as { [key: string]: string };
  const products = await getProducts({ query: searchValue });
  const resultsText = products.length > 1 ? 'results' : 'result';
  return ( 
    <>
      {searchValue ? (
        <p className="mb-4">
          {products.length === 0
            ? 'There are no products that match '
            : `Showing ${products.length} ${resultsText} for `}
          <span className="font-bold">&quot;{searchValue}&quot;</span>
        </p>
      ) : null}
      {products.length > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      ) : null}
    </>
   );
}
 
export default ProductsPage;