export interface IEditCurrentUser {
  id: number;
  email?: string;
  phone?: string;
  nationalCode?: string;
  cityId?: number | null;
  birthday?: string;
  economicCode?: string | null;
  fatherName?: string | null;
  firstName?: string;
  gender?: number | null;
  lastName?: string | null;
  pictureId?: string | null;
  rowVersion: string | null;
}
