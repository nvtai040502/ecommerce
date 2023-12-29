import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import Link from 'next/link';
import { getCollection, getCollectionProducts, getProduct, getProductRecommendations } from '@/lib/shopify';
import { Image as ImageType } from '@/lib/shopify/types';
import { Gallery } from '@/components/product/gallery';
import { ProductDescription } from '@/components/product/product-description';
import Image from 'next/image';
import ProductCarousel from '@/components/carousel/product';
import getCurrentUser from '@/lib/auth/getCurrentUser';
import { Shell } from '@/components/shells/shell';
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/page-header';
import { Products } from '@/components/products';
import { searchParamsSchema } from '@/lib/validations/params';
import { PRODUCT_PER_PAGE, defaultSort, sorting } from '@/lib/constants';
import { getAllPageInfoCollectionProducts } from '@/lib/actions/getAllPageInfo/collection';
import { PaginationButton } from '@/components/pagers/pagination-button';

interface CollectionPageProps {
  params: { handle: string }
  searchParams: {}
}

export default async function CollectionPage({ params, searchParams }: CollectionPageProps) {
  const collection = await getCollection({handle: params.handle})
  
  if (!collection) return notFound();
  const {
    page,
    sort,
  } = searchParamsSchema.parse(searchParams)
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
  const currentPage = Number(page) - 1
  const allPageInfo = await getAllPageInfoCollectionProducts({sortKey, reverse, collection: collection.handle})
  const after = currentPage > 0 ? allPageInfo[currentPage - 1].endCursor : undefined

  const {products} = await getCollectionProducts({
    sortKey, 
    reverse, 
    first: PRODUCT_PER_PAGE, 
    after, 
    collection: collection.handle
  })


  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading size="sm">{collection.title}</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          {collection.description}
        </PageHeaderDescription>
      </PageHeader>
      
      {products.length > 0 ? (
        <Products products={products}/>
      ) : null}

      {products.length > 0 ? (
        <PaginationButton pageInfo={allPageInfo[currentPage]} page={page} pageCount={allPageInfo.length}/>
      ): null}
      
    </Shell>
    );
}

