import { API_URL } from '@Config';
import authService from '@Services/common/auth.service';
import axios, { Method } from 'axios';
import qs from 'qs';
import ApiErrorHandlerMiddleware from './api-error-handler';

export interface TransporterOptions {
  params?: Object;
  anonymous?: boolean;
  data?: Object;
}

export default class Transporter {
  private _errorHandlerMiddleware = new ApiErrorHandlerMiddleware();
  private _axiosInstance = axios.create({
    baseURL: API_URL.V1,
    timeout: 0, // timeout handles by api
  });

  public async get<T>(url: string, options?: TransporterOptions): Promise<T> {
    return await this._transport('GET', url, options);
  }

  public async post<T>(url: string, options?: TransporterOptions): Promise<T> {
    return await this._transport('POST', url, options);
  }
  public async put<T>(url: string, options?: TransporterOptions): Promise<T> {
    return await this._transport('PUT', url, options);
  }

  public async patch<T>(url: string, options?: TransporterOptions): Promise<T> {
    return await this._transport('PATCH', url, options);
  }

  public async delete<T>(url: string, options?: TransporterOptions): Promise<T> {
    return await this._transport('DELETE', url, options);
  }

  private async _transport<T>(method: Method, url: string, options?: TransporterOptions): Promise<T> {
    const token: string | undefined = authService.getToken();
    const isTokenPresents: boolean = !!(token && !options?.anonymous);

    try {
      const responce = await this._axiosInstance.request<T>({
        method: method,
        url: url,
        params: options?.params,
        headers: {
          ...(isTokenPresents ? { Authorization: `Bearer ${token}` } : {}),
        },

        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: 'repeat' });
        },
        data: options?.data,
      });
      return responce.data;
    } catch (error) {
      console.error(error);
      throw this._errorHandlerMiddleware.parseApiError(error);
    }
  }
}
