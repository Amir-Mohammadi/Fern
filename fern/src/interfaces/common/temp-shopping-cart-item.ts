import { IProductColor } from './product-color';
import { IProductImage } from './product-image';
import { IProductPrice } from './product-price';

export interface ITempShoppingCartItem {
  productName: string;
  productId: number;
  color: IProductColor;
  brandName: string;
  amount: number;
  price: IProductPrice | undefined;
  previewProductImage: IProductImage;
}
