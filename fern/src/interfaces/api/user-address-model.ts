import { CityModel } from '@Services';

export interface UserAddressModel {
  id: number;
  city: CityModel;
  description: string;
  postal_code: string;
  phone: string;
  address_owner_name: string;
  is_default: boolean;
  city_id: number;
  row_version: string;
}
