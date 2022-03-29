import { IOrderCheckoutBankBill } from './order-checkout-bank-bill';
import { IOrderCheckoutCargo } from './order-checkout-cargo';
import { IOrderCheckoutFacture } from './order-checkout-facture';

export interface IOrderCheckout {
  bankBills: Array<IOrderCheckoutBankBill>;
  facture: IOrderCheckoutFacture;
  cargos: Array<IOrderCheckoutCargo>;
}
