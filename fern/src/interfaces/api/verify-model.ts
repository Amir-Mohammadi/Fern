import { AuthenticateType } from '@Components/login';
import { AuthenticateLoginType } from '@Interfaces/common';

export interface VerifyModel {
  token: string;
  authenticate_type: AuthenticateType;
  authenticate_login_type: AuthenticateLoginType;
  is_optional_authenticate_type: boolean;
}
