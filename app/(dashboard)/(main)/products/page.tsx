import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/page-header";
import { PaginationButton } from "@/components/pagers/pagination-button";
import { Products } from "@/components/products";
import { Shell } from "@/components/shells/shell";
import { getAllPageInfoCollectionProducts } from "@/lib/actions/getAllPageInfo/collection";
import { getAllPageInfoProducts } from "@/lib/actions/getAllPageInfo/products";
import { PRODUCT_PER_PAGE, defaultSort, sorting } from "@/lib/constants";
import { getCollectionProducts, getCollections, getProducts } from "@/lib/shopify";
import { searchParamsSchema } from "@/lib/validations/params";
import { notFound } from "next/navigation";

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
    collection
  } = searchParamsSchema.parse(searchParams)
  
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
  const collections = await getCollections()
  const currentPage = Number(page) - 1

  
  let products_render = []
  let allPageInfo_render = []
  if (!collection) {
    const allPageInfo = await getAllPageInfoProducts({sortKey, reverse})
    const after = currentPage > 0 ? allPageInfo[currentPage - 1].endCursor : undefined
    const {products} = await getProducts({sortKey, reverse, after})
    products_render = products
    allPageInfo_render = allPageInfo
  } else {
    const allPageInfo = await getAllPageInfoCollectionProducts({sortKey, reverse, collection})
    const after = currentPage > 0 ? allPageInfo[currentPage - 1].endCursor : undefined

    const {products} = await getCollectionProducts({
      sortKey, 
      reverse, 
      first: PRODUCT_PER_PAGE, 
      after, 
      collection
    })
    products_render = products
    allPageInfo_render = allPageInfo
  }

  if (allPageInfo_render.length <= 0) {
    return notFound()
  }

  return ( 
    <Shell>
      <PageHeader>
        <PageHeaderHeading size="sm">Products</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Buy products
          
        </PageHeaderDescription>
      </PageHeader>
      
      {products_render.length > 0 ? (
        <Products products={products_render} collections={collections}/>
      ) : null}

      {products_render.length > 0 ? (
        <PaginationButton pageInfo={allPageInfo_render[currentPage]} page={page} pageCount={allPageInfo_render.length}/>
      ): null}
      
    </Shell>
   );
}
 
export default ProductsPage;