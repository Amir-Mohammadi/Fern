export interface SaveUserAddressModel {
  city_id: number;
  description: string;
  postal_code: string;
  phone: string;
  address_owner_name: string;
  row_version: string | null;
}
