import { CityModel } from './city-model';
import { Gender } from './gender';
import { UserType } from './user-type';

export interface UserModel {
  id: number;
  enabled: boolean;
  roles: UserType;
  email: string;
  phone: string;
  national_code: string;
  birthday: string;
  economic_code: string;
  father_name: string;
  first_name: string;
  city: CityModel;
  gender?: Gender;
  last_name: string;
  picture_id: string;
  row_version: string;
  city_id?: number | null;
}
