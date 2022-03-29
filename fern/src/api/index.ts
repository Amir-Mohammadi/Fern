import axios, { AxiosError, AxiosResponse, Method } from 'axios';
import https from 'https';
import { getToken } from '../utils/auth-checker';
import { API, ROUTES } from '../utils/statics';
import {
  IAddAddress,
  IAuthenticateReq,
  IAuthenticateRes,
  IBrand,
  IChangeEmail,
  IChangePassword,
  IChangePhone,
  IEditAccountInfo,
  IFiltrableProperties,
  IGetAccountInfo,
  IGetAddresses,
  IGetCity,
  IGetLikedProducts,
  IGetMarketBriefStuffs,
  IGetMarketStuff,
  IGetMarketStuffProperties,
  IGetOrders,
  IGetProvince,
  IGetRecentVisit,
  IGetUserComments,
  IProductCategories,
  IPropertyValue,
  IVerifyAuthenticateReq,
  IVerifyAuthenticateRes,
} from './models';

class Api {
  private async send(method: Method, url: string, data?: any, params?: any, file?: boolean): Promise<AxiosResponse> {
    try {
      const agent = new https.Agent({
        rejectUnauthorized: false,
      });
      const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'DELETE, POST, GET, PUT',
        'Access-Control-Allow-Headers': '*',
        'Content-Type': 'application/json',
      };
      const res = await axios(
        file
          ? {
              method,
              url,
              data,
              params,
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: getToken(),
              },
            }
          : {
              method,
              url,
              data,
              params,
              headers: {
                Authorization: getToken(),
              },
            },
      );

      return res;
    } catch (e: any | AxiosError) {
      if (axios.isAxiosError(e)) {
        if (e.response?.data.code == 1003) {
          window.location.href = '/login-register';
        }
      }

      throw e;
    }
  }

  v1 = {
    commonApi: {
      getProvinces: (): Promise<AxiosResponse<IGetProvince[]>> => {
        return this.send('GET', `${API.V1}/${ROUTES.PROVINCES}`);
      },
      getProvinceCities: (provinceId: number): Promise<AxiosResponse<IGetCity[]>> => {
        return this.send('GET', `${API.V1}/${ROUTES.PROVINCES}/${provinceId}/cities`);
      },
    },
    marketApi: {
      getMarketStuffById: (marketStuffId: number): Promise<AxiosResponse<IGetMarketStuff>> => {
        return this.send('GET', `${API.V1}/${ROUTES.MARKET_STUFFS}/${marketStuffId}`);
      },
      getAllMarketBriefStuff: (
        params: URLSearchParams | null,
        esp?: string,
      ): Promise<AxiosResponse<IGetMarketBriefStuffs[]>> => {
        return this.send('GET', `${API.V1}/${ROUTES.MARKET_BRIEF_STUFFS}?${esp}`, null, params);
      },
      getMarketStuffCategories: (): Promise<AxiosResponse<IProductCategories[]>> => {
        return this.send('GET', `${API.V1}/${ROUTES.MARKET_STUFF_CATEGORIES}`);
      },
      getMarketBrand: (brandId: number): Promise<AxiosResponse<IBrand>> => {
        return this.send('GET', `${API.V1}/${ROUTES.MARKET_BRANDS}/${brandId}`);
      },
      getMarketBrands: (): Promise<AxiosResponse<IBrand[]>> => {
        return this.send('GET', `${API.V1}/${ROUTES.MARKET_BRANDS}/`);
      },
      getMarketBrandStuffCategories: (brandId: number): Promise<AxiosResponse<IProductCategories[]>> => {
        return this.send('GET', `${API.V1}/${ROUTES.MARKET_BRANDS}/${brandId}/stuff-categories`);
      },
      getMarketBriefStuffById: (marketStuffId: number): Promise<AxiosResponse<IGetMarketBriefStuffs>> => {
        return this.send('GET', `${API.V1}/${ROUTES.MARKET_BRIEF_STUFFS}/${marketStuffId}`);
      },
      getMarketStuffsProperties: (marketStuffId: number): Promise<AxiosResponse<IGetMarketStuffProperties[]>> => {
        return this.send('GET', `${API.V1}/${ROUTES.MARKET_STUFFS}/${marketStuffId}/properties`);
      },
      getFiltrableProperties: (marketStuffCategoryId: number): Promise<AxiosResponse<IFiltrableProperties[]>> => {
        return this.send('GET', `${API.V1}/${ROUTES.MARKET_STUFF_CATEGORIES}/${marketStuffCategoryId}/properties`);
      },
      getFiltrablePropertiesValues: (
        marketStuffCategoryId: number,
        propertyId: number,
      ): Promise<AxiosResponse<IPropertyValue[]>> => {
        return this.send(
          'GET',
          `${API.V1}/${ROUTES.MARKET_STUFF_CATEGORIES}/${marketStuffCategoryId}/properties/${propertyId}/values`,
        );
      },
      getMarketStuffCategoryStuffPrices: (marketStuffCategoryId: number): Promise<AxiosResponse<number[]>> => {
        return this.send('GET', `${API.V1}/${ROUTES.MARKET_STUFF_CATEGORIES}/${marketStuffCategoryId}/stuff-prices`);
      },
      getMarketStuffCategoryBrands: (marketStuffCategoryId: number): Promise<AxiosResponse<IBrand[]>> => {
        return this.send('GET', `${API.V1}/${ROUTES.MARKET_STUFF_CATEGORIES}/${marketStuffCategoryId}/brands`);
      },
    },
    marketCustomerApi: {
      likeProduct: (marketStuffId: number): Promise<AxiosResponse<void>> => {
        return this.send('POST', `${API.V1}/${ROUTES.MARKET_STUFFS}/${marketStuffId}/like`);
      },
      unLikeProduct: (marketStuffId: number): Promise<AxiosResponse<void>> => {
        return this.send('DELETE', `${API.V1}/${ROUTES.MARKET_STUFFS}/${marketStuffId}/unlike`);
      },
    },
    productApi: {
      deleteProductComment: (productId: number, commentId: number): Promise<AxiosResponse<void>> => {
        return this.send('DELETE', `${API.V1}/${ROUTES.PRODUCTS}/${productId}/comments/${commentId}`);
      },
    },
    userApi: {
      editSelfProfile: (data: IEditAccountInfo): Promise<AxiosResponse<void>> => {
        return this.send('PATCH', `${API.V1}/${ROUTES.ME}`, data);
      },
      getSelfUser: (): Promise<AxiosResponse<IGetAccountInfo>> => {
        return this.send('GET', `${API.V1}/${ROUTES.ME}`);
      },
      changeSelfPhone: (data: IChangePhone): Promise<AxiosResponse<void>> => {
        return this.send('POST', `${API.V1}/${ROUTES.ME}/change-phone`, data);
      },
      changeSelfEmail: (data: IChangeEmail): Promise<AxiosResponse<void>> => {
        return this.send('POST', `${API.V1}/${ROUTES.ME}/change-email`, data);
      },
      changePassword: (data: IChangePassword): Promise<AxiosResponse<void>> => {
        return this.send('POST', `${API.V1}/${ROUTES.ME}/change-password`, data);
      },
      createSelfProfileAddress: (data: IAddAddress) => {
        return this.send('POST', `${API.V1}/${ROUTES.ME}/addresses`, data);
      },
      getSelfProfileAddresses: (): Promise<AxiosResponse<IGetAddresses[]>> => {
        return this.send('GET', `${API.V1}/${ROUTES.ME}/addresses`);
      },
      editSelfProfileAddress: (data: IAddAddress, addressId: number) => {
        return this.send('PUT', `${API.V1}/${ROUTES.ME}/addresses/${addressId}`, data);
      },
      deleteSelfProfileAddress: (addressId: number) => {
        return this.send('DELETE', `${API.V1}/${ROUTES.ME}/addresses/${addressId}`);
      },
      setSelfDefaultProfileAddress: (addressId: number) => {
        return this.send('PATCH', `${API.V1}/${ROUTES.ME}/addresses/${addressId}/default`);
      },
      getSelfOrders: (): Promise<AxiosResponse<IGetOrders[]>> => {
        return this.send('GET', `${API.V1}/${ROUTES.ME}/orders`);
      },
      getUserComments: (): Promise<AxiosResponse<IGetUserComments[]>> => {
        return this.send('GET', `${API.V1}/${ROUTES.ME}/comments`);
      },
      getUserRecentProductVisits: (): Promise<AxiosResponse<IGetRecentVisit[]>> => {
        return this.send('GET', `${API.V1}/${ROUTES.ME}/recent-visits`);
      },
      getLikedProducts: (): Promise<AxiosResponse<IGetLikedProducts[]>> => {
        return this.send('GET', `${API.V1}/${ROUTES.ME}/liked-products`);
      },
      authenticate: (data: IAuthenticateReq): Promise<AxiosResponse<IAuthenticateRes>> => {
        return this.send('POST', `${API.V1}/${ROUTES.USERS}/authenticate`, data);
      },
      verifyAuthenticate: (data: IVerifyAuthenticateReq): Promise<AxiosResponse<IVerifyAuthenticateRes>> => {
        return this.send('POST', `${API.V1}/${ROUTES.USERS}/verify-authenticate`, data);
      },
    },
  };
}

const api = new Api();
export default api;
