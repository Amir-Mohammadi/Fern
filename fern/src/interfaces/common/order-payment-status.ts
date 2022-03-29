import { PaymentStatus } from './payment-status';

export interface IOrderPaymentStatus {
  orderId: number;
  orderPaymentId: number;
  status: PaymentStatus;
}
