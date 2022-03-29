export interface EditCurrentUserModel {
  id: number;
  email?: string;
  phone?: string;
  national_code?: string;
  city_id?: number | null;
  birthday?: string;
  economic_code?: string | null;
  father_name?: string | null;
  first_name?: string;
  gender?: number | null;
  last_name?: string | null;
  picture_id?: string | null;
  row_version: string | null;
}
