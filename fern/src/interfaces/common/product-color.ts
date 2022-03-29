import { IColor } from './color';

export interface IProductColor {
  productId: number;
  colorId: number;
  color: IColor | null;
}
