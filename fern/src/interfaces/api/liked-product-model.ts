import { ProductImageModel } from '.';

export interface LikedProductModel {
  name: string;
  preview_product_image: ProductImageModel;
  price: number;
  discount: number;
  discount_type: number | null;
  has_selling_stock: boolean;
}
