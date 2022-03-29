import { AuthenticateType } from '@Components/login';
import { AuthenticateLoginType } from './authenticate-login-type';

export interface IVerify {
  token: string;
  authenticateType: AuthenticateType;
  authenticateLoginType: AuthenticateLoginType;
  isOptionalAuthenticateType: boolean;
}
