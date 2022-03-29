import { IShoppingProductBrand } from './shopping-product-brand';
import { IShoppingProductColor } from './shopping-product-color';
import { IShoppingProductPreviewImage } from './shopping-product-preview-image';
import { IShoppingProductPrice } from './shopping-product-price';

export interface IShoppingProduct {
  productId: number;
  productName: string;
  productBrand: IShoppingProductBrand;
  productColor: IShoppingProductColor;
  productPreviewImage: IShoppingProductPreviewImage;
  productPrice: IShoppingProductPrice;
  rowVersion: string | null;
  metaDescription: string;
}
