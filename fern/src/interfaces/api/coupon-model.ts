export interface CouponModel {
  id: number;
  coupon_code: string;
  max_quantities: number;
  value: number;
  expiry_date: string;
  active: boolean;
}
