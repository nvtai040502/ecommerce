import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/page-header";
import { PaginationButton } from "@/components/pagers/pagination-button";
import { Products } from "@/components/products";
import { Shell } from "@/components/shells/shell";
import { getAllPageInfo } from "@/lib/actions/getAllPageInfo";
import { defaultSort, sorting } from "@/lib/constants";
import { getPageInfo, getProducts } from "@/lib/shopify";
import { searchParamsSchema } from "@/lib/validations/params";

interface ProductsPageProps {
  searchParams: {
  }
}

export const metadata = {
  title: "Products",
  description: "Buy products from our store",
}

const ProductsPage = async ({
  searchParams
}: ProductsPageProps) => {

  const {
    page,
    sort,
  } = searchParamsSchema.parse(searchParams)
  
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;


  const allPageInfo = await getAllPageInfo({sortKey, reverse})
  
  const after = Number(page) > 1 ? allPageInfo[Number(page) - 1].endCursor : undefined

  const products = await getProducts({sortKey, reverse, after})
  const pageInfo = await getPageInfo({sortKey, reverse, after})
  
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

      {products.length > 0 ? (
        <PaginationButton pageInfo={pageInfo} page={page} pageCount={allPageInfo.length - 1}/>
      ): null}
      
    </Shell>
   );
}
 
export default ProductsPage;