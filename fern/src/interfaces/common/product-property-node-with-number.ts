import { IProductPropertyItemType } from './product-property-item-type';
import { IProductPropertyNodeBase } from './product-property-node-base';

export interface IProductPropertyNodeWithNumber extends IProductPropertyNodeBase {
  type: IProductPropertyItemType.Number;
  value: number;
}
