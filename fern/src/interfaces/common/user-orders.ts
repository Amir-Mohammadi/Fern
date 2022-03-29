import { OrderItemStatusType } from './order-item-status-type';

export interface IUserOrder {
  [x: string]: any;
  id: number;
  productName: string;
  productCategoryName: string;
  colorCode: string;
  colorName: string;
  brandName: string;
  productPrice: string;
  rowVersion: string;
  imageUrl: string;
  status: OrderItemStatusType;
  city: string;
  purchasedAt: string;
}
