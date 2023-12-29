import { PRODUCT_PER_PAGE } from "@/lib/constants";
import { getCollectionProducts, getProducts } from "@/lib/shopify";

export async function getAllPageInfoCollectionProducts({
  collection,
  reverse,
  sortKey,
  first= PRODUCT_PER_PAGE
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
  first?: number
}) {
  let hasNextPage = true;
  let after = undefined;
  const allPageInfo = [];

  while (hasNextPage) {
    const {pageInfo} = await getCollectionProducts({
      collection,
      reverse,
      sortKey,
      after,
      first
    });
    if(!pageInfo) {
      return []
    }
    allPageInfo.push(pageInfo)
    if (pageInfo.hasNextPage) {
      after = pageInfo.endCursor;
    } else {
      hasNextPage = false;
    }
  }

  return allPageInfo;
}
