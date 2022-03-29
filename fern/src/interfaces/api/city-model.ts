import { ProvinceModel } from './province-model';

export interface CityModel {
  id: number;
  name: string;
  province: ProvinceModel;
  row_version: string;
}
