import { CityModel } from './city-model';

export interface CurrentUserModel {
  id: number;
  enabled: Boolean;
  roles: Number;
  email: string;
  phone: string;
  national_code: string;
  birthday: string;
  economic_code: string;
  father_name: string;
  first_name: string;
  city: CityModel;
  gender: number;
  last_name: string;
  picture_id: string;
  row_version: string;
}
