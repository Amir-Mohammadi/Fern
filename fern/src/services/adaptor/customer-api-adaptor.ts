//#region imports
import { getStaticURl } from '@Config';
import {
  CartItemAmountModel,
  CartItemModel,
  CartModel,
  EditCartAddressModel,
  OrderCheckoutBankBillModel,
  OrderCheckoutCargoModel,
  OrderCheckoutFactureModel,
  OrderCheckoutModel,
  OrderPaymentModel,
  OrderPaymentStatusModel,
  ShoppingCartCityModel,
  ShoppingCouponModel,
  ShoppingProductBrandModel,
  ShoppingProductColorModel,
  ShoppingProductModel,
  ShoppingProductPreviewImageModel,
  ShoppingProductPriceModel,
  WriteCommentModel,
} from '@Interfaces/api';
import { BriefCartItemModel } from '@Interfaces/api/brief-cart-item-model';
import { BriefCartModel } from '@Interfaces/api/brief-cart-model';
import { CartBillModel } from '@Interfaces/api/cart-bill-model';
import { OrderShippingCostModel } from '@Interfaces/api/order-shipping-cost-model';
import {
  IBriefCartItem,
  ICart,
  ICartItem,
  ICartItemEdit,
  IEditCartAddress,
  IOrderPayment,
  IOrderShippingCost,
  IShoppingCartCity,
  IShoppingCoupon,
  IShoppingProduct,
  IShoppingProductBrand,
  IShoppingProductColor,
  IShoppingProductPreviewImage,
  IShoppingProductPrice,
  IWriteComment,
} from '@Interfaces/common';
import { IBriefCart } from '@Interfaces/common/brief-cart';
import { ICartBill } from '@Interfaces/common/cart-bill';
import { IOrderCheckout } from '@Interfaces/common/order-checkout';
import { IOrderCheckoutBankBill } from '@Interfaces/common/order-checkout-bank-bill';
import { IOrderCheckoutCargo } from '@Interfaces/common/order-checkout-cargo';
import { IOrderCheckoutFacture } from '@Interfaces/common/order-checkout-facture';
import { IOrderPaymentStatus } from '@Interfaces/common/order-payment-status';
import { priceFormat } from '@Utils/common';
import moment from 'jalali-moment';
//#endregion

class CustomerApiAdaptor {
  public reverseTransformCartItemAmountModel(cartItemAmount: ICartItemEdit): CartItemAmountModel {
    return {
      amount: cartItemAmount.amount,
      row_version: cartItemAmount.rowVersion,
    };
  }

  public reverseTransformEditCartAddress(cartAddress: IEditCartAddress): EditCartAddressModel {
    return {
      user_address_id: cartAddress.userAddressId,
      row_version: cartAddress.rowVersion,
    };
  }

  public transformCartBill(cartBill: CartBillModel): ICartBill {
    return {
      totalDiscountPrice: cartBill.total_discount_price,
      totalPrice: cartBill.total_price,
      totalShippingPrice: cartBill.total_shipping_price,
      totalTaxPrice: cartBill.total_tax_price,
      totalPayPrice: cartBill.total_pay_price,
    };
  }
  public transformCart(cart: CartModel): ICart {
    if (String(cart) == '') {
      return {
        cartItems: [],
        id: 0,
        cartBill: {
          totalPrice: 0,
          totalDiscountPrice: 0,
          totalShippingPrice: 0,
          totalTaxPrice: 0,
          totalPayPrice: 0,
        },
        createdAt: '',
        updatedAt: null,
        userAddressId: null,
        rowVersion: '',
      };
    } else {
      return {
        id: cart.id,
        cartBill: this.transformCartBill(cart.cart_bill),
        createdAt: cart.created_at,
        updatedAt: cart.updated_at,
        userAddressId: cart.user_address_id,
        rowVersion: cart.row_version,
        cartItems: this._transformCartItems(cart.cart_items),
      };
    }
  }

  public transformBriefCart(cart: BriefCartModel): IBriefCart {
    if (String(cart) == '') {
      return {
        cartItems: [],
        totalPrice: '0',
        id: 0,
      };
    } else {
      return {
        id: cart.id,
        totalPrice: priceFormat(cart.total_price, 'fa', 'تومان'),
        cartItems: this._transformBriefCartItems(cart.cart_items),
      };
    }
  }
  public transformCoupon(coupon: ShoppingCouponModel): IShoppingCoupon {
    return {
      id: coupon.id,
      value: coupon.value,
      code: coupon.code,
      status: coupon.status,
    };
  }

  public reverseTransformCoupon(coupon: IShoppingCoupon): ShoppingCouponModel {
    return {
      id: coupon.id,
      value: coupon.value,
      code: coupon.code,
      status: coupon.status,
    };
  }

  public transformOrderPayment(orderPayment: OrderPaymentModel): IOrderPayment {
    return {
      kind: orderPayment.kind,
      gateway: orderPayment.gateway,
      orderPaymentId: orderPayment.order_payment_id,
    };
  }

  //#endregion

  public transformOrderSummary(orderSummary: OrderCheckoutModel): IOrderCheckout {
    return {
      bankBills: this._transformOrderSummaryBankBill(orderSummary.bank_bills),
      facture: this._transformOrderSummaryFacture(orderSummary.facture),
      cargos: this._transformOrderSummaryCargos(orderSummary.cargos),
    };
  }

  public transformPaymentStatus(orderPaymentStatus: OrderPaymentStatusModel): IOrderPaymentStatus {
    return {
      orderId: orderPaymentStatus.order_id,
      orderPaymentId: orderPaymentStatus.order_payment_id,
      status: orderPaymentStatus.status,
    };
  }

  public reverseTransformWriteCommentInterface(writeComment: IWriteComment): WriteCommentModel {
    return {
      text: writeComment.text,
    };
  }

  private _transformCartItems(cartItems: Array<CartItemModel>): ICartItem[] {
    return cartItems.map((cartItem) => {
      return {
        id: cartItem.id,
        amount: cartItem.amount ?? 1,
        isAvailableShipping: cartItem.is_available_shipping,
        product: this._transformShoppingProductModel(cartItem.product),
        rowVersion: cartItem.row_version,
        metaDescription: cartItem.product.meta_description ?? '',
      };
    });
  }

  private _transformBriefCartItems(cartItems: Array<BriefCartItemModel>): IBriefCartItem[] {
    return cartItems.map((cartItem) => {
      return {
        id: cartItem.product_id,
        amount: cartItem.amount,
        price: priceFormat(cartItem.product_price, 'fa', 'تومان'),
        title: cartItem.product_name,
        previewImage: this._transformProductImageModel(cartItem.preview_image),
        metaDescription: cartItem.meta_description ?? '',
      };
    });
  }
  private _transformShoppingProductModel(shoppingProduct: ShoppingProductModel): IShoppingProduct {
    return {
      productId: shoppingProduct.product_id,
      productName: shoppingProduct.product_name ?? '',
      productBrand: this._transformShoppingProductBrandModel(shoppingProduct.product_brand),
      productColor: this._transformProductColor(shoppingProduct.product_color),
      productPreviewImage: this._transformProductImageModel(shoppingProduct.product_preview_image),
      productPrice: this._transformShoppingProductPriceModel(shoppingProduct.product_price),
      rowVersion: shoppingProduct.row_version,
      metaDescription: shoppingProduct.meta_description ?? '',
    };
  }

  private _transformShoppingProductBrandModel(brand: ShoppingProductBrandModel): IShoppingProductBrand {
    return {
      id: brand.id,
      brandName: brand.brand_name,
    };
  }

  private _transformShoppingProductPriceModel(productPrice: ShoppingProductPriceModel): IShoppingProductPrice {
    return {
      id: productPrice.id,
      price: productPrice.price ?? 0,
      discount: productPrice.discount,
      city: this._transformShoppingCartCityModel(productPrice.city),
    };
  }

  private _transformShoppingCartCityModel(city: ShoppingCartCityModel): IShoppingCartCity {
    return {
      id: city.id,
      provinceId: city.province_id,
      cityName: city.city_name,
      provinceName: city.province_name,
    };
  }

  private _transformProductImageModel(
    productImageModel: ShoppingProductPreviewImageModel,
  ): IShoppingProductPreviewImage {
    const imageUrl = getStaticURl(productImageModel.image_id, productImageModel?.image_row_version ?? '');
    return {
      imageUrl: imageUrl,
      imageAlt: productImageModel.image_alt,
      imageTitle: productImageModel.image_title,
      toolTip: productImageModel.image_title,
    };
  }

  private _transformProductColor(productColor: ShoppingProductColorModel): IShoppingProductColor {
    return {
      colorHexCode: this._transformIntegerColorToHexColor(productColor.color_code ?? 0),
      colorName: productColor.color_name,
      id: productColor.id,
    };
  }

  private _transformIntegerColorToHexColor(code: number) {
    return '#' + code.toString(16);
  }

  private _transformOrderSummaryBankBill(
    orderSummaryBankBills: Array<OrderCheckoutBankBillModel>,
  ): Array<IOrderCheckoutBankBill> {
    return orderSummaryBankBills.map((bill) => {
      return {
        billDateTime: moment(bill.bill_date_time).format('jYYYY/jMM/jDD'),
        refNum: bill.ref_num,
        paymentNum: bill.payment_num,
        orderNum: bill.order_num,
      };
    });
  }
  private _transformOrderSummaryFacture(orderSummaryFacture: OrderCheckoutFactureModel): IOrderCheckoutFacture {
    return {
      totalPrice: orderSummaryFacture.total_price,
      discountPrice: orderSummaryFacture.discount_price,
      shippingPrice: orderSummaryFacture.shipping_price,
      taxPrice: orderSummaryFacture.tax_price,
      totalPayPrice: orderSummaryFacture.total_pay_price,
    };
  }
  private _transformOrderSummaryCargos(
    orderSummaryCargoItems: Array<OrderCheckoutCargoModel>,
  ): Array<IOrderCheckoutCargo> {
    return orderSummaryCargoItems.map((cargoItems) => {
      return {
        productName: cargoItems.product_name,
        productColorName: cargoItems.product_color_name,
        productBrandName: cargoItems.product_brand_name,
        price: cargoItems.price,
        discount: cargoItems.discount,
        shippingDateTime: cargoItems.shipping_date_time,
        amount: cargoItems.amount,
      };
    });
  }

  public transformOrderShippingCost(orderShippingCost: OrderShippingCostModel): IOrderShippingCost {
    return {
      totalShippingCost: orderShippingCost.total_shipping_cost,
      notAvailableCartItems: orderShippingCost.not_available_cart_items,
    };
  }
  //#endregion
}

export { CustomerApiAdaptor };
