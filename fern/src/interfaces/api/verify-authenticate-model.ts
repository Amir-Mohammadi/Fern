import { AuthenticateType } from '@Components/login';

export interface VerifyAuthenticateModel {
  authenticate_type: AuthenticateType;
  password: string;
  verification_token: string;
}
