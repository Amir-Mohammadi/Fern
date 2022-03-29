import { CityModel, Gender, UserType } from '@Services';

export interface IUser {
  id: number;
  enabled: boolean;
  roles: UserType;
  email: string | null;
  phone: string | null;
  nationalCode: string;
  birthday: string | null;
  economicCode: string | null;
  fatherName: string | null;
  firstName: string;
  city: CityModel;
  gender?: Gender | null;
  lastName: string | null;
  pictureId: string | null;
  rowVersion: string | null;
  cityId?: number | null;
}
