import { ProductColorModel, ProductImageModel } from '.';

export interface UserCommentModel {
  id: number;
  text: string;
  created_at: string;
  update_at: string;
  product_name: string;
  preview_product_image: ProductImageModel;
  default_product_color: ProductColorModel;
  product_id: number;
  brand_name: string;
}
