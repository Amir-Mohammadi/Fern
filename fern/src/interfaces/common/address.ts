import { ICity } from './city';

export interface IAddress {
  id: number;
  city: ICity;
  description: string;
  postalCode: string;
  phone: string;
  addressOwnerName: string;
  isDefault: boolean;
  rowVersion: string;
  cityId?: number;
}
