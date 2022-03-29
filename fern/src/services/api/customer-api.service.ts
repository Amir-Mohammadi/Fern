import { BriefCartModel } from '@Interfaces/api/brief-cart-model';
import { CartBillModel } from '@Interfaces/api/cart-bill-model';
import { OrderShippingCostModel } from '@Interfaces/api/order-shipping-cost-model';
import { ShoppingCartItemModel } from '@Interfaces/api/shopping-cart-item-model';
import {
  ICart,
  ICartItemEdit,
  IEditCartAddress,
  IOrderPayment,
  IOrderShippingCost,
  IOrderShopping,
  IShoppingCoupon,
} from '@Interfaces/common';
import { IBriefCart } from '@Interfaces/common/brief-cart';
import { ICalculateCartBill } from '@Interfaces/common/calculate-cart-bil';
import { ICartBill } from '@Interfaces/common/cart-bill';
import { IOrderCheckout } from '@Interfaces/common/order-checkout';
import { IOrderPaymentStatus } from '@Interfaces/common/order-payment-status';
import {
  CartModel,
  OrderCheckoutModel,
  OrderPaymentModel,
  OrderPaymentStatusModel,
  OrderShoppingModel,
  ShoppingCouponModel,
} from '@Services';
import { adaptorService } from '@Services/adaptor';
import Transporter from '@Utils/transporter';

class CustomerApiService {
  private _transporter: Transporter;

  constructor(transporter: Transporter) {
    this._transporter = transporter;
  }

  public async getCart(): Promise<ICart> {
    const cart = await this._transporter.get<CartModel>('customer/cart');
    return adaptorService.customerApiAdaptor.transformCart(cart);
  }

  public async getBriefCart(): Promise<IBriefCart> {
    const cart = await this._transporter.get<BriefCartModel>('customer/cart/brief');
    return adaptorService.customerApiAdaptor.transformBriefCart(cart);
  }
  public async getCartBill(calculateCartBill: ICalculateCartBill | null): Promise<ICartBill> {
    const cartBill = await this._transporter.get<CartBillModel>(
      'customer/cart/bill/?coupon_code=' + calculateCartBill?.couponCode ?? '',
    );
    return adaptorService.customerApiAdaptor.transformCartBill(cartBill);
  }
  public async addProductToCart(cartItem: ShoppingCartItemModel): Promise<void> {
    return await this._transporter.post<void>('customer/cart/item/', {
      data: cartItem,
    });
  }

  public async getCalculatedShippingCost(): Promise<IOrderShippingCost> {
    const orderShippingCost = await this._transporter.get<OrderShippingCostModel>('shopping/calculate-shipping-cost', {
      anonymous: false,
    });

    return adaptorService.customerApiAdaptor.transformOrderShippingCost(orderShippingCost);
  }

  public async editProductQuantity(cartItemAmount: ICartItemEdit): Promise<void> {
    const transformedCartItemAmount = adaptorService.customerApiAdaptor.reverseTransformCartItemAmountModel(
      cartItemAmount,
    );
    return await this._transporter.patch('customer/cart/item/' + cartItemAmount.id, {
      data: transformedCartItemAmount,
    });
  }

  public async editCartAddress(cartAddress: IEditCartAddress) {
    const transformedCartAddress = adaptorService.customerApiAdaptor.reverseTransformEditCartAddress(cartAddress);

    return await this._transporter.patch('customer/cart/address', { data: transformedCartAddress });
  }

  public async prepareOrderShopping(orderShopping: IOrderShopping): Promise<IOrderPayment> {
    const transformedOrderShopping: OrderShoppingModel = orderShopping;
    const orderPayment = await this._transporter.post<OrderPaymentModel>('shoppings/order-finalize', {
      data: transformedOrderShopping,
    });

    return adaptorService.customerApiAdaptor.transformOrderPayment(orderPayment);
  }

  public async deleteCartItem(cartItemId: number): Promise<void> {
    return await this._transporter.delete('customer/cart/item/' + cartItemId);
  }

  public async validateCartCoupon(couponCode: string): Promise<IShoppingCoupon> {
    const coupon = await this._transporter.get<ShoppingCouponModel>('customer/cart/coupon/' + couponCode);
    return adaptorService.customerApiAdaptor.transformCoupon(coupon);
  }

  public async getCheckout(orderId: string): Promise<IOrderCheckout> {
    const order = await this._transporter.get<OrderCheckoutModel>('shopping/checkout/' + orderId);
    return adaptorService.customerApiAdaptor.transformOrderSummary(order);
  }

  public async getOrderPaymentStatus(orderPaymentId: string): Promise<IOrderPaymentStatus> {
    const paymentStatus = await this._transporter.get<OrderPaymentStatusModel>(
      'shopping/order-payment-status/' + orderPaymentId,
    );

    return adaptorService.customerApiAdaptor.transformPaymentStatus(paymentStatus);
  }
}

export default CustomerApiService;
