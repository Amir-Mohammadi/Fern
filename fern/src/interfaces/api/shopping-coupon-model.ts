import { CouponValidateStatus } from '@Interfaces/common';

export interface ShoppingCouponModel {
  id: number;
  value: number;
  code: string;
  status: CouponValidateStatus;
}
