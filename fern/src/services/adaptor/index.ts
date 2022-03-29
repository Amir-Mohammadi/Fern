import { CommonApiAdaptor } from './common-api-adaptor';
import { CustomerApiAdaptor } from './customer-api-adaptor';
import { MarketStuffApiAdaptor } from './market-stuff-api-adaptor';
import { UserApiAdaptor } from './user-api-adaptor';

export const adaptorService = {
  customerApiAdaptor: new CustomerApiAdaptor(),
  commonApiAdaptor: new CommonApiAdaptor(),
  userApiAdaptor: new UserApiAdaptor(),
  marketStuffApiAdaptor: new MarketStuffApiAdaptor(),
};
