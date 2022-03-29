import { IBriefProduct } from './brief-product';
import { ISimpleUser } from './simple-user';

export interface IProductComment {
  id: number;
  author: ISimpleUser;
  payload: string;
  createdAt: string;
  updateAt: string;
  product: IBriefProduct; // this is essential, all the comments are for a product, so we need the product
}
