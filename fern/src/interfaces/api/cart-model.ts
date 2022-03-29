import { CartBillModel } from './cart-bill-model';
import { CartItemModel } from './cart-item-model';

export interface CartModel {
  id: number;
  created_at: string;
  updated_at: string | null;
  cart_bill: CartBillModel;
  cart_items: Array<CartItemModel>;
  user_address_id: number | null;
  row_version: string | null;
}
