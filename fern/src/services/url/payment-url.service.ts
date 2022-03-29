import { BaseUrlService } from './base-url.service';

class PaymentUrlService extends BaseUrlService {
  parsePaymentId(payment_id: string | string[] | undefined) {
    if (typeof payment_id != 'string') throw new Error('provided orderId is not a string');
    return payment_id;
  }
  parseOrderId(order_id: string | string[] | undefined) {
    if (typeof order_id != 'string') throw new Error('provided orderId is not a string');
    return order_id;
  }
}

export { PaymentUrlService };
