import { ICartBill } from './cart-bill';
import { ICartItem } from './cart-item';

export interface ICart {
  id: number;
  createdAt: string;
  updatedAt: string | null;
  cartBill: ICartBill | null;
  cartItems: Array<ICartItem>;
  userAddressId?: number | null;
  rowVersion: string | null;
}
