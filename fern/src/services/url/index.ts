import { BaseUrlService } from './base-url.service';
import { LoginUrlService } from './login-url.service';
import { PaymentUrlService } from './payment-url.service';
import { ProductUrlService } from './product-url.service';
import { SearchUrlService } from './search-url.service';

export const urlService = {
  baseUrlService: new BaseUrlService(),
  loginUrlService: new LoginUrlService(),
  productUrlService: new ProductUrlService(),
  paymentUrlService: new PaymentUrlService(),
  searchUrlService: new SearchUrlService(),
};
