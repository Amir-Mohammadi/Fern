import { ProductDiscountType } from '@Services';
import { IProductColor } from './product-color';
import { IProductImage } from './product-image';

export interface IBriefProduct {
  id: number;
  name: string | null;
  urlTitle: string | null;
  browserTitle: string | null;
  brandName: string | null;
  price: number;
  discount: number;
  discountType: ProductDiscountType | null;
  previewProductImage: IProductImage | null;
  metaDescription: string;
  productColor?: IProductColor | null;
}
