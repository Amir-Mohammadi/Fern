import { AuthenticateType } from '@Components/login';

export interface IVerifyAuthenticate {
  authenticateType: AuthenticateType;
  password: string;
  verificationToken: string;
}
