import { CityModel, ProvinceModel } from '@Interfaces';
import { ICity, IProvince } from '@Interfaces/common';
import { adaptorService } from '@Services';
import Transporter from '@Utils/transporter';

class CommonApiService {
  private _transporter: Transporter;

  constructor(transporter: Transporter) {
    this._transporter = transporter;
  }

  public async getProvinces(): Promise<Array<IProvince>> {
    const provinces = await this._transporter.get<Array<ProvinceModel>>('Provinces');
    return adaptorService.commonApiAdaptor.transformProvinces(provinces);
  }

  public async getProvinceCities(provinceId: number): Promise<Array<ICity>> {
    const cities = await this._transporter.get<Array<CityModel>>('Provinces/' + provinceId + '/cities');
    return adaptorService.commonApiAdaptor.transformCities(cities);
  }
}

export { CommonApiService };
