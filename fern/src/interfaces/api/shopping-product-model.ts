import { ShoppingProductBrandModel } from './shopping-product-brand-model';
import { ShoppingProductColorModel } from './shopping-product-color-model';
import { ShoppingProductPreviewImageModel } from './shopping-product-preview-image-model';
import { ShoppingProductPriceModel } from './shopping-product-price-model';

export interface ShoppingProductModel {
  product_id: number;
  product_name: string;
  product_brand: ShoppingProductBrandModel;
  product_color: ShoppingProductColorModel;
  product_preview_image: ShoppingProductPreviewImageModel;
  product_price: ShoppingProductPriceModel;
  row_version: string | null;
  meta_description: string | null;
}
