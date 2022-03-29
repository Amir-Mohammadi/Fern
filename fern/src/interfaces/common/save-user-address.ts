export interface ISaveUserAddress {
  cityId: number;
  description: string;
  postalCode: string;
  phone: string;
  addressOwnerName: string;
  rowVersion: string | null;
}
