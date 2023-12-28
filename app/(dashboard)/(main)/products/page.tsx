import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/page-header";
import { Products } from "@/components/products";
import { Shell } from "@/components/shells/shell";
import { defaultSort, sorting } from "@/lib/constants";
import { getProducts } from "@/lib/shopify";

interface ProductsPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export const metadata = {
  title: "Products",
  description: "Buy products from our store",
}

const ProductsPage = async ({
  searchParams
}: ProductsPageProps) => {

  
  const { sort } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
  const products = await getProducts({sortKey, reverse});
  return ( 
    <Shell>
      <PageHeader>
        <PageHeaderHeading size="sm">Products</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Buy products
        </PageHeaderDescription>
      </PageHeader>
      
      {products.length > 0 ? (

        <Products products={products} />

        
      ) : null}
    </Shell>
   );
}
 
export default ProductsPage;