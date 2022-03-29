//#region imports
import { PopUpProps } from '@Components/pop-up';
import { PageUrls } from '@Constants/page-urls';
import { ICart, ICartItem, ICartItemEdit } from '@Interfaces/common';
import { ICartItemInfo } from '@Interfaces/common/cart-item-info';
import { RouterRef } from '@Pages/_app';
import { cartService } from '@Services';
import authService from '@Services/common/auth.service';
import { priceFormat } from '@Utils/common';
import { action, computed, makeObservable, observable } from 'mobx';
import { Stores } from './core/stores';
//#endregion

//#region enums
export enum ShippingStep {
  Shipping,
  Payment,
  Checkout,
}
//#endregion

export class CartStore {
  async onFetchData() {
    var cart = await cartService.getCart();
    this.initializeCart(cart);
  }
  //#region contractor
  constructor() {
    makeObservable(this);
  }

  cartService = cartService;
  //#endregion

  //#region observables
  @observable popUp: { status: boolean; data: PopUpProps } = {
    status: false,
    data: {
      title: '',
      message: '',
      onClose: () => {},
    },
  };
  @observable private _cartItems: Array<ICartItem> = [];
  @observable confirmButtonTitle = 'ادامه';
  @observable totalDeliveryPrice: string = '0';
  @observable taxPrice: string = '0';
  @observable totalPrice: string = '0';
  @observable totalPayPrice: string = '0';
  //#endregion

  //#region computed
  @computed get confirmButtonDisable() {
    return this._cartItems.length <= 0;
  }

  @computed get cartItemsLength() {
    return this.cartService.calculateTotalProductCount(this._cartItems);
  }

  @computed get cartItems(): Array<ICartItem> {
    return this._cartItems;
  }
  @computed get cartItemInfos(): Array<ICartItemInfo> {
    return this._cartItems.map((cartItem) => {
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
  @action onConfirmButtonClick = () => {
    if (RouterRef) {
      RouterRef.push(PageUrls.Shipping);
    }
  };
  //#endregion

  //#region actions
  @action onDecreaseQuantity = async (index: number) => {
    const cartItem = this.cartItems[index];
    if (cartItem.amount > 1) {
      this._executeFunctionWithLoading(async () => {
        await this._decreaseQuantity({
          id: cartItem.id,
          productId: cartItem.product.productId,
          amount: cartItem.amount,
          colorId: cartItem.product.productColor.id,
          rowVersion: cartItem.rowVersion,
        });
      });
    }
  };

  @action onIncreaseQuantity = async (index: number) => {
    this._executeFunctionWithLoading(async () => {
      const cartItem = this.cartItems[index];
      await this._increaseQuantity({
        id: cartItem.id,
        productId: cartItem.product.productId,
        amount: cartItem.amount,
        colorId: cartItem.product.productColor.id,
        rowVersion: cartItem.rowVersion,
      });
    });
  };

  @action onConfirmButton() {
    if (authService.isAuthenticated) window.location.href = '/shipping';
    else window.location.href = '/login-register';
  }

  @action onDeleteCartItem = (index: number) => {
    this.setPopUp(true, {
      title: 'حذف محصول',
      message: `آیا میخواهید محصول ${this.cartItems[index].product.productName} را از سبد خود حذف کنید ؟`,
      options: [
        {
          text: 'بله',
          type: 'submit',
          action: async () => {
            this._executeFunctionWithLoading(async () => {
              const cartItem = this.cartItems[index];
              await this._deleteCartItem({
                id: cartItem.id,
                productId: cartItem.product.productId,
                amount: cartItem.amount,
                colorId: cartItem.product.productColor.id,
                rowVersion: cartItem.rowVersion,
              });
            });
            this.setPopUp(false);
          },
        },
        {
          text: 'انصراف',
          type: 'cancel',
          action: () => {
            this.setPopUp(false);
          },
        },
      ],
      onClose: () => this.setPopUp(false),
    });
  };
  //#endregion

  //#region methods
  private setPopUp = (status: boolean, data?: PopUpProps) => {
    const temp = { ...this.popUp };
    temp.status = status;
    temp.data = data || {
      title: '',
      message: '',
      onClose: () => {},
    };

    this.popUp = temp;
  };

  private async _increaseQuantity(cartItem: ICartItemEdit) {
    cartItem.amount += 1;
    const cart = await cartService.increaseProductQuantity(cartItem);
    this.initializeCart(cart);
  }

  private async _decreaseQuantity(cartItem: ICartItemEdit) {
    cartItem.amount -= 1;
    const cart = await cartService.decreaseProductQuantity(cartItem);
    this.initializeCart(cart);
  }

  private async _deleteCartItem(cartItem: ICartItemEdit) {
    const cart = await cartService.deleteCartItem(cartItem);
    this.initializeCart(cart);
  }

  private async _executeFunctionWithLoading(fn: Function) {
    try {
      Stores?.global.setLoading(true);

      await fn();

      Stores?.global.setLoading(false);
    } catch (error) {
      throw error;
    }
  }
  //#endregion
  @action initializeCart(cart: ICart) {
    this._cartItems = cart?.cartItems ?? [];
    var totalDeliveryPrice = cart?.cartBill?.totalShippingPrice ?? 0;
    var taxPrice = cart?.cartBill?.totalTaxPrice ?? 0;
    var totalPrice = cart?.cartBill?.totalPrice ?? 0;
    var totalPayPrice = totalPrice + taxPrice + totalDeliveryPrice;
    this.totalDeliveryPrice = totalDeliveryPrice.toLocaleString('fa');
    this.taxPrice = taxPrice.toLocaleString('fa');
    this.totalPrice = totalPrice.toLocaleString('fa');
    this.totalPayPrice = totalPayPrice.toLocaleString('fa');
  }
  @action hydrate = (hydrateProps?: CartStoreHydrateProps) => {};
}

//#region types
export interface InjectedCartStore {
  cartStore: CartStore;
}

export interface CartStoreHydrateProps {
  cart?: ICart;
}
//#endregion
