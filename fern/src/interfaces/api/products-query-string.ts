export interface IProductsQueryString {
  sortBy?: string;
  brand?: string[] | string;
  min_price?: string;
  max_price?: string;
  only_in_stock?: boolean;
  discounted?: boolean;
  q?: string;
}
