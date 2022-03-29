import { IProductPropertyItemType } from './product-property-item-type';
import { IProductPropertyNodeBase } from './product-property-node-base';

export interface IProductPropertyNodeWithString extends IProductPropertyNodeBase {
  type: IProductPropertyItemType.Text;
  value: string;
}
