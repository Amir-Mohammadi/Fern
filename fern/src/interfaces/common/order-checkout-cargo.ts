export interface IOrderCheckoutCargo {
  productName: string;
  productColorName: string;
  productBrandName: string;
  shippingDateTime: string | null;
  price: number;
  discount: number;
  amount: number;
}
