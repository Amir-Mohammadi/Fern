import { ProductColorModel, ProductImageModel } from '.';

export interface VisitedProductModel {
  id: number;
  name?: string;
  brand_name?: string;
  default_product_color: ProductColorModel;
  preview_product_image: ProductImageModel;
}
