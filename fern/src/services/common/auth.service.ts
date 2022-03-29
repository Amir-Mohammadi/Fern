//#region imports

import { ILoginResult } from '@Interfaces/common';
import { apiService } from '@Services/api';
import { appendProjectPrefix } from '@Utils/append-project-prefix';
import { parseStringToObject } from '@Utils/common';
import { IAuthenticateReq, IAuthenticateRes, IVerifyAuthenticateReq, IVerifyAuthenticateRes } from 'api/models';
import { NextApiRequestCookies } from 'next/dist/next-server/server/api-utils';
import api from '../../api';
import cookieService, { CookieKeys } from './cookies.service';
//#endregion

class AuthService {
  private _authenticationResult?: ILoginResult;

  public getToken(): string | undefined {
    if (this._authenticationResult === undefined) {
      return this._loadUserAuthenticationResultFromCookie()?.token;
    } else {
      return this._authenticationResult.token;
    }
  }

  public get isAuthenticated(): boolean {
    if (this.getToken() == undefined) return false;
    else return true;
  }

  public async logout(): Promise<void> {
    try {
      await apiService.v1.UserApi.logout();
    } catch (error) {
      console.error('logout failed');
    } finally {
      this.removeAuthenticationResult();
    }
  }

  public retrieveAndSaveAuthenticationResult(cookie: NextApiRequestCookies): void {
    try {
      const cookieKey = appendProjectPrefix(CookieKeys.AUTHENTICATION_RESULT);
      const authenticationResult = cookie[cookieKey];
      const parsedAuthenticationResult = parseStringToObject<ILoginResult>(authenticationResult);
      this._saveAuthenticationResultInMemory(parsedAuthenticationResult);
    } catch (error) {
      this.removeAuthenticationResult();
    }
  }

  public async authenticate(authentication: IAuthenticateReq): Promise<IAuthenticateRes> {
    try {
      const res = await api.v1.userApi.authenticate(authentication);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  public async verifyAuthenticate(data: IVerifyAuthenticateReq): Promise<IVerifyAuthenticateRes> {
    try {
      const res = await api.v1.userApi.verifyAuthenticate(data);
      this.saveAuthenticationResult(res.data); //TEMP
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  public saveAuthenticationResult(authenticationResult: ILoginResult) {
    this._saveAuthenticationResultInMemory(authenticationResult);
    this._saveAuthenticationResultInCookie(authenticationResult);
  }

  private _saveAuthenticationResultInCookie(authenticationResult: ILoginResult) {
    cookieService.set(CookieKeys.AUTHENTICATION_RESULT, authenticationResult);
  }

  private _saveAuthenticationResultInMemory(authenticationResult: ILoginResult) {
    this._authenticationResult = authenticationResult;
  }

  private _loadUserAuthenticationResultFromCookie(): ILoginResult | undefined {
    try {
      const authenticationResult = cookieService.getObject<ILoginResult>(CookieKeys.AUTHENTICATION_RESULT);
      if (authenticationResult === undefined) {
        return;
      } else {
        this._saveAuthenticationResultInMemory(authenticationResult);
        return authenticationResult;
      }
    } catch (error) {
      console.error(error);
      cookieService.remove(CookieKeys.AUTHENTICATION_RESULT); // delete the corrupted cookie
      return;
    }
  }

  public removeAuthenticationResult() {
    this._removeAuthenticationResultFromMemory();
    this._removeAuthenticationResultFromCookie();
  }

  private _removeAuthenticationResultFromCookie() {
    cookieService.remove(CookieKeys.AUTHENTICATION_RESULT);
  }

  private _removeAuthenticationResultFromMemory() {
    this._authenticationResult = undefined;
  }
}

const authService = new AuthService();
export default authService;
