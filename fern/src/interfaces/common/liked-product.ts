import { IProductImage } from './product-image';

export interface ILikedProduct {
  text: string;
  previewProductImage: IProductImage;
  realPrice: number;
  discountRate: number;
  discountPrice?: number;
  discountType: number | null;
  offer: boolean;
  image: string;
  hasSellingStock: boolean;
}
