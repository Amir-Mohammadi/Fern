import { ShoppingProductPreviewImageModel } from './shopping-product-preview-image-model';

export interface BriefCartItemModel {
  id: number;
  product_id: number;
  product_name: string;
  amount: number;
  product_price: number;
  preview_image: ShoppingProductPreviewImageModel;
  meta_description: string | null;
}
