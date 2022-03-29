import { IProductAnswer } from './product-answer';

export interface IMarketStuffQuestion {
  id: number;
  userId: number | null;
  profileId: number | null;
  payload: string;
  firstName: string | null;
  lastName: string | null;
  answers: Array<IProductAnswer> | null;
  createdAt: string;
}
