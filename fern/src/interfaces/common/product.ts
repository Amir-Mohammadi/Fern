import { IMarketBrand } from './market-brand';
import { IMarketProductCategory } from './market-product-category';
import { IProductImage } from './product-image';

export interface IProduct {
  id: number;
  name: string;
  likedByMe: boolean;
  altTitle: string;
  rowVersion: string;
  briefDescription: string;
  defaultColorId: number;
  previewProductImage: IProductImage;
  brand: IMarketBrand | null;
  productCategory: IMarketProductCategory | null;
}
