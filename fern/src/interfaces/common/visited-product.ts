import { IProductColor } from './product-color';

export interface IVisitedProduct {
  product: {
    id: number;
    title?: string;
    brand?: string;
    color?: string;
    productColor?: IProductColor;
    image?: string;
  };
}
