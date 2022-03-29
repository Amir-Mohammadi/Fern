import { PaymentStatus } from '@Interfaces/common/payment-status';

export interface OrderPaymentStatusModel {
  order_id: number;
  order_payment_id: number;
  status: PaymentStatus;
}
