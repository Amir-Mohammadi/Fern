import { CouponValidateStatus } from './coupon-validate-status';

export interface IShoppingCoupon {
  id: number;
  value: number;
  code: string;
  status: CouponValidateStatus;
}
