import { ICity } from './city';
import { IProvince } from './province';

export interface ILocation {
  province: IProvince;
  cities: ICity[];
}
