//#region imports
import Transporter from '@Utils/transporter';
import { CommonApiService } from './common-api.service';
import CustomerApiService from './customer-api.service';
import MarketApiService from './market-api.service';
import MarketCustomerApiService from './market-customer-api.service';
import PaymentApiService from './payment-api.service';
import UserApiService from './user-api.service';
//#endregion

class ApiService {
  private _transporter = new Transporter();

  public v1 = {
    CustomerApi: new CustomerApiService(this._transporter),
    PaymentApi: new PaymentApiService(this._transporter),
    MarketApi: new MarketApiService(this._transporter),
    MarketCustomerApi: new MarketCustomerApiService(this._transporter),
    UserApi: new UserApiService(this._transporter),
    CommonApi: new CommonApiService(this._transporter),
  };
}

export const apiService = new ApiService();
