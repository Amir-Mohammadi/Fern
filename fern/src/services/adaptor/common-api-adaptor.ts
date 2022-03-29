import { CityModel, ProvinceModel } from '@Interfaces';
import { ICity, IProvince } from '@Interfaces/common';

class CommonApiAdaptor {
  public transformCities(cities: Array<CityModel>): Array<ICity> {
    return cities.map((city) => {
      return {
        id: city.id,
        name: city.name,
        province: this.transformProvince(city.province),
        rowVersion: city.row_version,
      };
    });
  }

  public transformProvince(province: ProvinceModel): IProvince {
    return {
      id: province.id,
      name: province.name,
      areaCode: province.area_code,
      rowVersion: province.row_version,
    };
  }
  public transformProvinces(provinces: Array<ProvinceModel>): Array<IProvince> {
    return provinces.map((province) => {
      return {
        id: province.id,
        name: province.name,
        areaCode: province.area_code,
        rowVersion: province.row_version,
      };
    });
  }
}

export { CommonApiAdaptor };
