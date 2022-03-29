import { ShoppingCartCityModel } from './shopping-cart-city-model';

export interface ShoppingProductPriceModel {
  id: number;
  price: number;
  discount: number;
  city: ShoppingCartCityModel;
}
