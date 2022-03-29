import { MarketBrandModel } from './market-brand-model';
import { MarketProductCategoryModel } from './market-product-category-model';
import { ProductImageModel } from './product-image-model';

export interface MarketStuffModel {
  id: number;
  name: string | null;
  liked_by_me: boolean;
  alt_title: string | null;
  brief_description: string | null;
  default_color_id: number | null;
  preview_product_image: ProductImageModel | null;
  brand: MarketBrandModel | null;
  product_category: MarketProductCategoryModel | null;
  url_title: string | null;
  browser_title: string | null;
  meta_description: string | null;
  row_version: string;
}
