import { OrderCheckoutBankBillModel } from './order-checkout-bankBill-model';
import { OrderCheckoutCargoModel } from './order-checkout-cargo-model';
import { OrderCheckoutFactureModel } from './order-checkout-facture-model';

export interface OrderCheckoutModel {
  bank_bills: Array<OrderCheckoutBankBillModel>;
  facture: OrderCheckoutFactureModel;
  cargos: Array<OrderCheckoutCargoModel>;
}
