import { getProducts } from "@/lib/shopify";

export async function getAllPageInfoProducts({
  query,
  reverse,
  sortKey,
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}) {
  let hasNextPage = true;
  let after = undefined;
  const allPageInfo = [];

  while (hasNextPage) {
    const {pageInfo} = await getProducts({
      query,
      reverse,
      sortKey,
      after,
    });
    allPageInfo.push(pageInfo)
    if (pageInfo.hasNextPage) {
      after = pageInfo.endCursor;
    } else {
      hasNextPage = false;
    }
  }

  return allPageInfo;
}
