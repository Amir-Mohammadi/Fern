import { ICart } from './cart';
import { ShoppingStatus } from './shopping-status';

export interface IOrder {
  id: number;
  trackingId: number;
  cart: ICart;
  purchasedAt?: string;
  status: ShoppingStatus;
}
