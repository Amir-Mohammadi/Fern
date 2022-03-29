import { ColorModel } from './color-model';

export interface ProductColorModel {
  product_id: number;
  color_id: number;
  color: ColorModel;
}
