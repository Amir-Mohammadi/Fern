import { IProvince } from './province';

export interface ICity {
  id: number;
  province: IProvince;
  name: string;
  rowVersion: string;
}
