import { AuthenticateType } from '@Components/login';
import { PageUrls } from '@Constants/page-urls';
import { UrlsConfig } from '@Constants/url-config';
import { TextValidator, ValidatorScope } from '@Utils/text-validator';
import { BaseUrlService, UrlQuery } from './base-url.service';

const emailValidator = new TextValidator(ValidatorScope.email);

class LoginUrlService extends BaseUrlService {
  public createLoginConfirmUrl(
    loginToken: string,
    authenticateType: AuthenticateType,
    isOptionalAuthenticateType: boolean,
  ) {
    const authenticateTypeUrl = this._mapAuthenticateType(authenticateType);
    return `${PageUrls.LoginConfirm}?token=${loginToken}&authenticateType=${authenticateTypeUrl}&isOptional=${isOptionalAuthenticateType}`;
  }

  public parseLoginToken(loginToken: UrlQuery): string {
    if (typeof loginToken != 'string') throw new Error('provided type is not a string');

    return loginToken;
  }

  public parseAuthenticateType(authenticateType: UrlQuery): AuthenticateType {
    if (typeof authenticateType != 'string') throw new Error('provided type is not a string');

    if (authenticateType == UrlsConfig.LoginTypesInUrl.Password) return AuthenticateType.Password;
    else if (authenticateType == UrlsConfig.LoginTypesInUrl.OneTimePassword) return AuthenticateType.OneTimePassword;
    else throw new Error('authenticate type not provided');
  }

  public parseIsOptional(isOptional: UrlQuery): boolean {
    if (typeof isOptional != 'string') throw new Error('provided type is not a string');

    if (isOptional == 'true') return true;
    else return false;
  }

  public parseEmail(email: UrlQuery): string {
    if (typeof email != 'string') throw new Error('provided email is not a string');
    if (!emailValidator.isValid(email)) throw new Error('email is not valid');

    return email;
  }

  private _mapAuthenticateType(authenticateType: AuthenticateType): string {
    switch (authenticateType) {
      case AuthenticateType.Password:
        return UrlsConfig.LoginTypesInUrl.Password;
      case AuthenticateType.OneTimePassword:
        return UrlsConfig.LoginTypesInUrl.OneTimePassword;
      default:
        return UrlsConfig.LoginTypesInUrl.OneTimePassword;
    }
  }
}
export { LoginUrlService };
