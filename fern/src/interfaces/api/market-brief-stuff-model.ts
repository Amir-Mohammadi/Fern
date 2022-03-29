import { ProductImageModel } from './product-image-model';

export interface MarketBriefStuffModel {
  id: number;
  name: string | null;
  url_title: string | null;
  browser_title: string | null;
  brand_name: string | null;
  price: number;
  discount: number;
  // discount_type: ProductDiscountType;
  preview_market_stuff_image: ProductImageModel | null;
  meta_description: string | null;
  has_selling_stock?: boolean | null;
}
