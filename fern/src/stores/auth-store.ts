//#region imports
import { AuthenticateType, LoginSteps } from '@Components/login';
import { cartService } from '@Services';
import authService from '@Services/common/auth.service';
import { isApiError } from '@Utils/api-error';
import Cookies from 'js-cookie';
import { action, makeObservable, observable } from 'mobx';
import { Stores } from './core/stores';
//#endregion

export class AuthStore {
  //#region contractor
  constructor() {
    makeObservable(this);
  }
  //#endregion

  @observable loginId: string = ''; // * can be email or phone number
  @observable validationCode: string = '';
  @observable password: string = '';
  @observable loginStep: LoginSteps = LoginSteps.EnterLoginId;
  @observable verificationToken: string = '';
  @observable authenticateType: AuthenticateType = AuthenticateType.OneTimePassword;
  @observable isOptionalAuthenticateType: boolean = false;

  @action setLoginId = (loginId: string) => {
    this.loginId = loginId;
  };

  @action setAuthenticateType = (authenticateType: AuthenticateType) => {
    this.authenticateType = authenticateType;
  };

  @action setIsOptionalAuthenticateType = (isOptional: boolean) => {
    this.isOptionalAuthenticateType = isOptional;
  };
  @action setVerificationToken = (verificationToken: string) => {
    this.verificationToken = verificationToken;
  };

  @action setValidationCode = (validationCode: string) => {
    this.validationCode = validationCode;
  };

  @action setPassword = (password: string) => {
    this.password = password;
  };

  // @action setLoginStep = (loginStep: LoginSteps) => {
  //   this.loginStep = loginStep;
  // };

  @action verifyAuthenticate = async () => {
    try {
      Stores?.global.setLoading(true);

      const res = await authService.verifyAuthenticate({
        authenticate_type: this.authenticateType,
        password: this.password,
        verification_token: this.verificationToken,
      });

      Cookies.set('__token', res.token, { expires: 1 / 8 });
      await cartService.transferLocalCart();
      Stores?.global.setLoading(false);
      window.location.href = '/';
    } catch (error) {
      Stores?.global.setLoading(false);
      alert('login filed');
    }
  };

  @action onConfirmLoginId = async () => {
    try {
      Stores?.global.setLoading(true);

      const authenticateResult = await authService.authenticate({ login_id: this.loginId });

      this.authenticateType = authenticateResult.authenticate_type;
      this.verificationToken = authenticateResult.token;
      this.loginStep = LoginSteps.Authenticate;
    } catch (error) {
      if (isApiError(error)) {
        alert(error.message);
      }
    } finally {
      Stores?.global.setLoading(false);
    }
  };

  //#region hydrate
  // hydrate(loginStore: AuthStoreHydrateProps | undefined) {
  //   if (!loginStore?.loginData) return;
  //   this.setLoginStep(LoginSteps.Authenticate);
  //   this.setAuthenticateType(loginStore.loginData.authenticateType);
  //   this.setVerificationToken(loginStore.loginData.token);
  //   this.setIsOptionalAuthenticateType(loginStore.loginData.isOptional);
  // }
  //#endregion
}

//#region types
export interface AuthStoreHydrateProps {
  loginData: LoginData;
}

export interface LoginData {
  token: string;
  authenticateType: AuthenticateType;
  isOptional: boolean;
}
export interface InjectedAuthStore {
  auth: AuthStore;
}

export enum LoginTypes {
  LoginViaPhoneNumber = 'login-via-phone-number',
  RegisterViaPhoneNumber = 'register-via-phone-number',
  LoginViaEmail = 'login-via-email',
  RegisterViaEmail = 'register-via-email',
}
//#endregionAuthenticateType types
