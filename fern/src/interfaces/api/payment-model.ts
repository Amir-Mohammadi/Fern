export interface PaymentModel {
  gateway: string;
  kind: string;
  extra_params: {
    coupon_code: string;
  };
}
