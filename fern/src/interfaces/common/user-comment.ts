import { IProductColor } from './product-color';
import { IProductImage } from './product-image';

export interface IUserComment {
  id: number;
  text: string;
  createdAt: string;
  updateAt: string;
  productName: string;
  previewProductImage: IProductImage;
  defaultProductColor: IProductColor;
  imageUrl: string;
  productId: number;
  brandName: string;
}
