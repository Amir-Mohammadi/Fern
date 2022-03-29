import { IBriefCartItem } from './brief-cart-item';

export interface IBriefCart {
  id: number;
  totalPrice: string;
  cartItems: Array<IBriefCartItem>;
}
