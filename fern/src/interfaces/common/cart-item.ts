import { IShoppingProduct } from './shopping-product';

export interface ICartItem {
  id: number;
  amount: number;
  product: IShoppingProduct;
  rowVersion: string | null;
  isAvailableShipping: boolean;
  metaDescription: string;
}
