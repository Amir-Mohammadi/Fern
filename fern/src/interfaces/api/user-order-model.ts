import { OrderItemStatusType } from '@Interfaces/common/order-item-status-type';
import { ColorModel, ProductImageModel } from '.';

export interface UserOrderModel {
  id: number;
  preview_product_image: ProductImageModel;
  product_name: string;
  product_category_name: string;
  brand_name: string;
  ordered_color: ColorModel;
  product_price: string;
  row_version: string;
  status: OrderItemStatusType;
  city: string;
}
