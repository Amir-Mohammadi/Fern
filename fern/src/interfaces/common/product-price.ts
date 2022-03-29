import { ProductDiscountType } from '@Services';
import { ICity } from './city';

export interface IProductPrice {
  id: number;
  productId: number;
  colorId: number;
  price: number;
  discountedPrice: number;
  maxPrice: number;
  minPrice: number;
  discountType: ProductDiscountType | null;
  discount: number;
  city: ICity;
}
