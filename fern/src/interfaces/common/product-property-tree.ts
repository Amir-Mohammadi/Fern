import { IProductPropertyNode } from './product-property-node';

export interface IProductPropertyTree {
  title: string;
  order: number;
  properties: Array<IProductPropertyNode>;
}
