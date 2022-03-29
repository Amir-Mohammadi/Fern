import { PaymentModel } from '@Services';
import Transporter from '@Utils/transporter';

class PaymentApiService {
  private _transporter: Transporter;

  constructor(transporter: Transporter) {
    this._transporter = transporter;
  }

  public async checkOrderPaymentVisit(orderPaymentId: string): Promise<string> {
    return await this._transporter.get('payments/order-payment-visit/' + orderPaymentId);
  }

  public async setOrderPaymentVisit(orderPaymentId: string): Promise<string> {
    return await this._transporter.patch('payments/order-payment-visit/' + orderPaymentId);
  }

  public async pay(paymentModel: PaymentModel): Promise<string> {
    return await this._transporter.post<string>('/payments', { data: paymentModel });
  }
}

export default PaymentApiService;
