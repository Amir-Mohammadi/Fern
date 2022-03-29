import { CityModel } from '@Services';
import { ProductDiscountType } from './product-discount-type';

export interface ProductPriceModel {
  id: number;
  product_id: number | null;
  color_id: number | null;
  price: number | null;
  max_price: number | null;
  min_price: number | null;
  discount_type: ProductDiscountType | null;
  discount: number | null;
  discounted_price: number;
  city: CityModel;
}
