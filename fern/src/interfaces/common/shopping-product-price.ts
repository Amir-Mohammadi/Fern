import { IShoppingCartCity } from './shopping-cart-city';

export interface IShoppingProductPrice {
  id: number;
  price: number;
  discount: number;
  city: IShoppingCartCity;
}
