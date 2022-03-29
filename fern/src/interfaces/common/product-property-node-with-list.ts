import { IProductPropertyItemType } from './product-property-item-type';
import { IProductPropertyNodeBase } from './product-property-node-base';

export interface IProductPropertyNodeWithList extends IProductPropertyNodeBase {
  type: IProductPropertyItemType.List;
  value: Array<string>;
}
