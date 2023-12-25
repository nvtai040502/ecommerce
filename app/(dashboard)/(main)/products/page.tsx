import Grid from "@/components/grid";
import ProductGridItems from "@/components/layout/product-grid-items";
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/page-header";
import { Shell } from "@/components/shells/shell";
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
    <Shell>
      <PageHeader>
        <PageHeaderHeading size="sm">Products</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Buy products
        </PageHeaderDescription>
      </PageHeader>
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
    </Shell>
   );
}
 
export default ProductsPage;