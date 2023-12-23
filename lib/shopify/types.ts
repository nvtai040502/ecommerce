export type Connection<T> = {
  edges: Array<Edge<T>>;
};
export type Edge<T> = {
  node: T;
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  description: string;
  tags: string[];
  updatedAt: string;
};


export type ShopifyCollectionProductsOperation = {
  data: {
    collection: {
      products: Connection<ShopifyProduct>;
    };
  };
  variables: {
    handle: string;
    reverse?: boolean;
    sortKey?: string;
  };
};
