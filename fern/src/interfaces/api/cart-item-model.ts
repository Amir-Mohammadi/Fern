import { ShoppingProductModel } from './shopping-product-model';

export interface CartItemModel {
  id: number;
  amount: number;
  product: ShoppingProductModel;
  is_available_shipping: boolean;
  row_version: string | null;
}
