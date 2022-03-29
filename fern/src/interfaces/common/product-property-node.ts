import { IProductPropertyNodeWithList } from './product-property-node-with-list';
import { IProductPropertyNodeWithNumber } from './product-property-node-with-number';
import { IProductPropertyNodeWithString } from './product-property-node-with-string';

export type IProductPropertyNode =
  | IProductPropertyNodeWithList
  | IProductPropertyNodeWithNumber
  | IProductPropertyNodeWithString;
