import { BriefCartItemModel } from './brief-cart-item-model';

export interface BriefCartModel {
  id: number;
  total_price: number;
  cart_items: Array<BriefCartItemModel>;
}
