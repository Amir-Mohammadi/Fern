//#region imports
import { OrderSummery } from '@Components/screens/order-screen';
import {
  CouponValidateStatus,
  IAddress,
  ICart,
  ICartItem,
  ICity,
  IProvince,
  IShoppingCoupon,
} from '@Interfaces/common';
import { ICartItemInfo } from '@Interfaces/common/cart-item-info';
import { IOrderCheckout } from '@Interfaces/common/order-checkout';
import { IOrderCheckoutBankBill } from '@Interfaces/common/order-checkout-bank-bill';
import { IOrderCheckoutCargo } from '@Interfaces/common/order-checkout-cargo';
import { RouterRef } from '@Pages/_app';
import { cartService, CartService } from '@Services';
import { apiService } from '@Services/api';
import { Stores } from '@Stores';
import { priceFormat } from '@Utils/common';
import { action, computed, makeObservable, observable, toJS } from 'mobx';
//#endregion

//#region enums
export enum OrderStep {
  Shipping,
  Payment,
  Checkout,
}
//#endregion

export class OrderStore {
  //#region contractor
  constructor() {
    makeObservable(this);
  }

  private cartService: CartService = cartService;

  @observable private coupon: IShoppingCoupon = { id: 0, value: 0, code: '', status: CouponValidateStatus.Deactive };

  private cart: ICart = {
    cartItems: [],
    createdAt: '',
    updatedAt: null,
    userAddressId: null,
    id: 0,
    cartBill: {
      totalDiscountPrice: 0,
      totalPrice: 0,
      totalShippingPrice: 0,
      totalTaxPrice: 0,
      totalPayPrice: 0,
    },
    rowVersion: '',
  };
  private cargos: Array<IOrderCheckoutCargo> = [];
  //#endregion

  //#region observables
  @observable cartItems: Array<ICartItem> = [];
  @observable private _userAddresses: Array<IAddress> = [];
  @observable orderSummeryList: Array<OrderSummery> = [];
  @observable public couponCode: string = '';
  @observable public openAddressesList: boolean = false;
  @observable public orderStep: OrderStep = OrderStep.Shipping;
  @observable public userSelectedAddressIndex = -1;
  @observable public isCouponSectionFolded: boolean = true;
  @observable public hasCoupon: boolean = false;
  @observable public totalProductPrice: string = '0';
  @observable public totalDeliveryPrice: string = '0';
  @observable public totalNumberOfProducts: number = 0;
  @observable public couponCost: string = '0';
  @observable public taxPrice: string = '0';
  @observable public totalPayPrice: string = '0';
  @observable public checkoutBankBills: Array<IOrderCheckoutBankBill> = [];
  @observable confirmButtonDisable: boolean = false;
  @observable provinceList: IProvince[] = [];
  @observable cityList: ICity[] = [];
  //#endregion
  @computed get cartItemInfos(): Array<ICartItemInfo> {
    return this.cartItems.map((cartItem) => {
      return {
        productId: cartItem.product.productId,
        productName: cartItem.product.productName,
        brandName: cartItem.product.productBrand.brandName,
        amount: cartItem.amount,
        city: cartItem.product.productPrice.city.cityName,
        colorName: cartItem.product.productColor.colorName,
        colorHexCode: cartItem.product.productColor.colorHexCode,
        metaDescription: cartItem.product.metaDescription,
        imageAlt: cartItem.product.productPreviewImage.imageAlt,
        imageUrl: cartItem.product.productPreviewImage.imageUrl,
        price: priceFormat(cartItem.product.productPrice.price, 'fa', 'تومان'),
        isAvailableShipping: cartItem.isAvailableShipping,
      };
    });
  }

  private defineConfirmButtonDisable() {
    if (this.orderStep == OrderStep.Shipping) {
      var addressIndex = this._userAddresses.findIndex((x) => x.id == this.cart.userAddressId);
      if (addressIndex != -1) {
        var cartItemIndex = this.cartItems.findIndex((x) => x.isAvailableShipping == false);
        if (cartItemIndex == -1) {
          this.confirmButtonDisable = false;
          return;
        }
      }
      this.confirmButtonDisable = true;
    } else this.confirmButtonDisable = true;
  }

  @action calculateBillData(cart: ICart) {
    this.totalDeliveryPrice = priceFormat(cart.cartBill?.totalShippingPrice ?? 0, 'fa', 'تومان');
    this.totalProductPrice = priceFormat(cart.cartBill?.totalPrice ?? 0, 'fa', 'تومان');
    this.totalNumberOfProducts = this.cartService.calculateTotalProductCount(cart.cartItems);
    this.taxPrice = priceFormat(cart.cartBill?.totalTaxPrice ?? 0, 'fa', 'تومان');
    this.couponCost = '';
    this.totalPayPrice = priceFormat(cart.cartBill?.totalPayPrice ?? 0, 'fa', 'تومان');
  }

  private generateOrderSummery(isCartItem: boolean) {
    if (isCartItem) {
      this.orderSummeryList = this.cartItems.map((cartItem) => {
        var product = cartItem.product;
        return this.mapOrderSummery(
          product.productName,
          product.productBrand.brandName,
          product.productColor.colorName,
          product.productPrice.price,
          product.productPrice.discount,
          cartItem.amount,
        );
      });
    } else {
      this.orderSummeryList = this.cargos.map((cargo) => {
        return this.mapOrderSummery(
          cargo.productName,
          cargo.productBrandName,
          cargo.productColorName,
          cargo.price,
          cargo.discount,
          cargo.amount,
        );
      });
    }
  }
  private mapOrderSummery(
    productName: string,
    brandName: string,
    colorName: string,
    price: number,
    discount: number,
    amount: number,
  ): OrderSummery {
    return {
      cargo: {
        title: productName + '-' + brandName + '-' + colorName ?? '-',
      },
      departTime: { title: '-' },
      price: { title: priceFormat(price, 'fa', 'تومان') },
      seller: { title: 'السل' },
      discount: { title: priceFormat((price * discount) / 100, 'fa', 'تومان') },
      totalPrice: { title: priceFormat(price - (price * discount) / 100, 'fa', 'تومان') },

      amount: { title: amount.toString() },
    };
  }

  @computed get userAddresses() {
    return toJS(this._userAddresses);
  }

  @computed get confirmButtonTitle() {
    return this.cartService.getOrderConfirmButtonTitle(this.orderStep);
  }

  @action setSelectedAddress(addressIndex: number) {
    try {
      this.userSelectedAddressIndex = addressIndex;
      const address = this._userAddresses[this.userSelectedAddressIndex];
      this._executeFunctionWithLoading(async () => {
        const cart = await cartService.editCartAddress({
          userAddressId: address?.id ?? 0,
          rowVersion: this.cart.rowVersion,
        });

        this.cart = cart;
        this.cartItems = cart.cartItems;
        this.defineConfirmButtonDisable();
        this.calculateBillData(this.cart);
      });
    } catch (error) {
      alert('Failed');
    }
  }

  @action setCouponCode(couponCode: string) {
    this.couponCode = couponCode;
  }

  @action toggleCouponFolded() {
    this.isCouponSectionFolded = !this.isCouponSectionFolded;
  }

  @action async onApplyCouponCode() {
    Stores?.global.setLoading(true);
    try {
      if (!this.hasCoupon) {
        const coupon = await apiService.v1.CustomerApi.validateCartCoupon(this.couponCode); //done
        if (coupon.status == CouponValidateStatus.Available) {
          this.coupon = coupon;
          this.hasCoupon = true;
          var cartBill = await apiService.v1.CustomerApi.getCartBill({ couponCode: this.coupon.code });
          this.couponCost = priceFormat(cartBill.totalDiscountPrice, 'fa', 'تومان');
          this.taxPrice = priceFormat(cartBill.totalTaxPrice, 'fa', 'تومان');
          this.totalPayPrice = priceFormat(cartBill.totalPayPrice, 'fa', 'تومان');
        } else {
          alert(CouponValidateStatus[coupon.status]);
        }
      } else {
        this.hasCoupon = false;
        this.couponCode = '';
        var cartBill = await apiService.v1.CustomerApi.getCartBill(null);
        this.coupon = { id: 0, value: 0, code: '', status: CouponValidateStatus.Deactive };
        this.couponCost = priceFormat(cartBill.totalDiscountPrice, 'fa', 'تومان');
        this.taxPrice = priceFormat(cartBill.totalTaxPrice, 'fa', 'تومان');
        this.totalPayPrice = priceFormat(cartBill.totalPayPrice, 'fa', 'تومان');
      }
    } catch (error) {
      alert('Failed');
    }
    Stores?.global.setLoading(false);
  }

  @action setOpenAddressesList(addressList: boolean) {
    this.openAddressesList = true;
  }

  @action async loadProvinceList() {
    this.provinceList = await apiService.v1.CommonApi.getProvinces();
  }

  @action async loadCitiesList(provinceId: number) {
    this.cityList = await apiService.v1.CommonApi.getProvinceCities(provinceId);
  }

  @action async addNewAddress(address: IAddress, callBack?: () => void) {
    Stores?.global.setLoading(true);
    try {
      await apiService.v1.UserApi.addNewAddress({
        cityId: address.city.id,
        addressOwnerName: address.addressOwnerName,
        phone: address.phone,
        postalCode: address.postalCode,
        description: address.description,
        rowVersion: null,
      });
      Stores?.global.setLoading(false);
      if (callBack) {
        callBack();
      }
    } catch (error) {
      Stores?.global.setLoading(false);
    } finally {
      this._userAddresses = await apiService.v1.UserApi.getUserAddresses();
    }
  }

  @action onConfirmButton = async () => {
    if (this.orderStep == OrderStep.Shipping) {
      window.location.href = '/payment';
    } else if (this.orderStep == OrderStep.Payment) {
      try {
        const pay = await apiService.v1.PaymentApi.pay({
          kind: 'cart',
          gateway: 'banktest:sep.ir',
          extra_params: {
            coupon_code: this.couponCode,
          },
        });

        document.write(pay);
      } catch (error) {
        alert('Failed');
      }
    } else {
      window.location.href = '/cart';
    }
  };

  @action setShippingStep = (shippingStep: OrderStep) => {
    this.orderStep = shippingStep;
  };

  @action hydrate(hydrateProps: OrderStoreHydrateProps | undefined) {
    if (!hydrateProps) return;

    switch (hydrateProps.orderStep) {
      case OrderStep.Shipping: {
        this._hydrateShippingPage(hydrateProps);
        return;
      }
      case OrderStep.Payment: {
        this._hydratePaymentPage(hydrateProps);
        return;
      }
      case OrderStep.Checkout: {
        this._hydrateCheckoutPage(hydrateProps);
        return;
      }
      default: {
        RouterRef?.back();
        throw new Error('order step is not valid');
      }
    }
  }

  private _hydrateShippingPage(hydrateProps: ShippingPageHydrateProps) {
    this.setShippingStep(OrderStep.Shipping);
    this.cart = hydrateProps.cart;
    this.cartItems = hydrateProps.cart.cartItems;
    this._userAddresses = hydrateProps.addresses;
    this.userSelectedAddressIndex = this._userAddresses.findIndex((address) => {
      return address.id == hydrateProps.cart.userAddressId ?? -1;
    });
    this.calculateBillData(this.cart);
    this.defineConfirmButtonDisable();
  }

  private _hydratePaymentPage(hydrateProps: PaymentPageHydrateProps) {
    this.setShippingStep(OrderStep.Payment);
    this.cart = hydrateProps.cart;
    this.coupon = { id: 0, value: 0, code: '', status: CouponValidateStatus.Deactive };
    this.cartItems = hydrateProps.cart.cartItems;
    this.calculateBillData(this.cart);
    this.generateOrderSummery(true);
  }

  private _hydrateCheckoutPage(hydrateProps: CheckoutPageHydrateProps) {
    this.setShippingStep(OrderStep.Checkout);
    this.totalNumberOfProducts = hydrateProps.orderSummary.cargos.length;
    this.totalProductPrice = priceFormat(hydrateProps.orderSummary.facture.totalPrice, 'fa', 'تومان');
    this.couponCost = priceFormat(hydrateProps.orderSummary.facture.discountPrice, 'fa', 'تومان');
    this.totalDeliveryPrice = priceFormat(hydrateProps.orderSummary.facture.shippingPrice, 'fa', 'تومان');
    this.taxPrice = priceFormat(hydrateProps.orderSummary.facture.taxPrice, 'fa', 'تومان');
    this.totalPayPrice = priceFormat(hydrateProps.orderSummary.facture.totalPayPrice, 'fa', 'تومان');
    this.checkoutBankBills = hydrateProps.orderSummary.bankBills;
    this.cargos = hydrateProps.orderSummary.cargos;
    this.generateOrderSummery(false);
  }

  private async _executeFunctionWithLoading(fn: Function) {
    Stores?.global.setLoading(true);

    await fn();

    Stores?.global.setLoading(false);
  }
}

//#region types
export interface InjectedOrderStore {
  orderStore: OrderStore;
}

export type OrderStoreHydrateProps = ShippingPageHydrateProps | PaymentPageHydrateProps | CheckoutPageHydrateProps;
interface ShippingPageHydrateProps {
  orderStep: OrderStep.Shipping;
  cart: ICart;
  addresses: Array<IAddress>;
}
interface PaymentPageHydrateProps {
  orderStep: OrderStep.Payment;
  cart: ICart;
}

interface CheckoutPageHydrateProps {
  orderStep: OrderStep.Checkout;
  orderSummary: IOrderCheckout;
}

//#endregion
