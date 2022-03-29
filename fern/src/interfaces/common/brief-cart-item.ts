import { IShoppingProductPreviewImage } from './shopping-product-preview-image';

export interface IBriefCartItem {
  title: string;
  amount: number;
  price: string;
  id: number;
  metaDescription?: string;
  previewImage: IShoppingProductPreviewImage | null;
}
