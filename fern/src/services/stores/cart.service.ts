import {
  IBriefCartItem,
  ICart,
  ICartItem,
  ICartItemEdit,
  IEditCartAddress,
  IOrderPayment,
  IOrderShopping,
  IShoppingCoupon,
} from '@Interfaces/common';
import { IBriefCart } from '@Interfaces/common/brief-cart';
import { ICartBill } from '@Interfaces/common/cart-bill';
import { ITempShoppingCartItem } from '@Interfaces/common/temp-shopping-cart-item';
import { apiService } from '@Services/api';
import authService from '@Services/common/auth.service';
import localStorageService, { LocalStorageKeys } from '@Services/common/local-storage.service';
import { Stores } from '@Stores';
import { OrderStep } from '@Stores/order-store';
import { priceFormat } from '@Utils/common';
import moment from 'jalali-moment';

export class CartService {
  public async getCart(): Promise<ICart> {
    if (authService.isAuthenticated) {
      let cart = await apiService.v1.CustomerApi.getCart();
      localStorageService.set(LocalStorageKeys.CART, cart);
      return cart;
    } else {
      let cart = localStorageService.get<ICart>(LocalStorageKeys.CART);
      if (cart == undefined) {
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
        return cart;
      }
    }
  }

  public async getBriefCart(): Promise<IBriefCart> {
    if (authService.isAuthenticated) {
      return await apiService.v1.CustomerApi.getBriefCart();
    } else {
      var cart = localStorageService.get<ICart>(LocalStorageKeys.CART);
      if (cart == undefined) {
        return {
          cartItems: [],
          totalPrice: '0',
          id: 0,
        };
      } else {
        return {
          id: 0,
          totalPrice: priceFormat(this._calculateTotalPriceFromCartItem(cart.cartItems), 'fa', 'تومان'),
          cartItems: this._transformCartToBriefCart(cart.cartItems),
        };
      }
    }
  }
  public async addProductToCart(shoppingCartItem: ITempShoppingCartItem) {
    if (authService.isAuthenticated) {
      await apiService.v1.CustomerApi.addProductToCart({
        product_id: shoppingCartItem.productId,
        color_id: shoppingCartItem.color.colorId,
        amount: 1,
      });
    } else {
      var cart = localStorageService.get<ICart>(LocalStorageKeys.CART);
      if (cart == undefined) {
        cart = this._generateTempCart();
      }
      cart = this._addCartItem(cart, shoppingCartItem);
      localStorageService.set(LocalStorageKeys.CART, cart);
    }
  }
  public getOrderConfirmButtonTitle(orderStep: OrderStep) {
    switch (orderStep) {
      case OrderStep.Shipping: {
        return 'تایید';
      }
      case OrderStep.Payment: {
        return 'پرداخت و ثبت نهایی سفارش';
      }
      case OrderStep.Checkout: {
        return 'چاپ';
      }
      default: {
        return '';
      }
    }
  }

  public calculateCouponCost(totalPrice: number, coupon: IShoppingCoupon) {
    return (totalPrice * coupon.value) / 100;
  }

  public calculateTotalDeliveryPrice(products: Array<ICartItem>) {
    let price = 0;
    return price;
  }

  public calculateTotalProductCount(products: Array<ICartItem>) {
    let amount = 0;
    products.forEach((product) => {
      amount += product.amount;
    });
    return amount;
  }

  public async increaseProductQuantity(cartItemAmount: ICartItemEdit): Promise<ICart> {
    if (authService.isAuthenticated) {
      await apiService.v1.CustomerApi.editProductQuantity(cartItemAmount);
    } else {
      this._editProductQuantityLocaly(cartItemAmount);
    }
    Stores?.headerStore.onFetchCartItemData();
    return await this.getCart();
  }

  public async decreaseProductQuantity(cartItemAmount: ICartItemEdit): Promise<ICart> {
    if (authService.isAuthenticated) {
      await apiService.v1.CustomerApi.editProductQuantity(cartItemAmount);
    } else {
      this._editProductQuantityLocaly(cartItemAmount);
    }
    Stores?.headerStore.onFetchCartItemData();
    return this.getCart();
  }

  public async deleteCartItem(cartItem: ICartItemEdit): Promise<ICart> {
    if (authService.isAuthenticated) {
      await apiService.v1.CustomerApi.deleteCartItem(cartItem.id);
    } else {
      this._deleteCartItemLocaly(cartItem);
    }
    Stores?.headerStore.onFetchCartItemData();
    return await this.getCart();
  }

  public async editCartAddress(cartAddress: IEditCartAddress): Promise<ICart> {
    await apiService.v1.CustomerApi.editCartAddress(cartAddress);
    return await apiService.v1.CustomerApi.getCart();
  }

  public async prepareOrderShopping(orderShopping: IOrderShopping): Promise<IOrderPayment> {
    return await apiService.v1.CustomerApi.prepareOrderShopping(orderShopping);
  }

  public async getCalculatedShippingCost() {
    return await apiService.v1.CustomerApi.getCalculatedShippingCost();
  }

  public async transferLocalCart() {
    var cart = localStorageService.get<ICart>(LocalStorageKeys.CART);
    if (cart != undefined) {
      for (let i = 0; i < cart.cartItems.length; i++) {
        await apiService.v1.CustomerApi.addProductToCart({
          amount: cart.cartItems[i].amount,
          color_id: cart.cartItems[i].product.productColor.id,
          product_id: cart.cartItems[i].product.productId,
        });
      }
      cart.cartItems.forEach((item) => {});
    }
  }

  private _generateTempCart(): ICart {
    return {
      id: 0,
      cartBill: null,
      cartItems: [],
      createdAt: moment.now().toString(),
      userAddressId: null,
      updatedAt: null,
      rowVersion: '',
    };
  }

  private _addCartItem(cart: ICart, shoppingCartItem: ITempShoppingCartItem): ICart {
    //#region create cart Item
    var oldCartItem = cart.cartItems.find((x) => x.product.productId == shoppingCartItem.productId);
    if (oldCartItem != undefined) {
      oldCartItem.amount += 1;
    } else {
      var cartItem: ICartItem = {
        id: 0,
        amount: shoppingCartItem.amount,
        isAvailableShipping: true,
        metaDescription: '',
        rowVersion: '',
        product: {
          productId: shoppingCartItem.productId,
          productName: shoppingCartItem.productName,
          productBrand: { id: 0, brandName: shoppingCartItem.brandName },
          productColor: {
            id: shoppingCartItem.color.color?.id ?? 0,
            colorHexCode: shoppingCartItem.color.color?.HexCode ?? '',
            colorName: shoppingCartItem.color.color?.name ?? '',
          },
          productPreviewImage: {
            imageAlt: shoppingCartItem.previewProductImage.imageAlt,
            imageTitle: shoppingCartItem.previewProductImage.imageTitle,
            imageUrl: shoppingCartItem.previewProductImage.imageUrl,
            toolTip: shoppingCartItem.previewProductImage.tooltip ?? '',
          },
          productPrice: {
            id: 0,
            city: {
              id: 0,
              cityName: shoppingCartItem.price?.city.name ?? '',
              provinceId: shoppingCartItem.price?.city.province.id ?? 0,
              provinceName: shoppingCartItem.price?.city.province.name ?? '',
            },
            discount: shoppingCartItem.price?.discount ?? 0,
            price: shoppingCartItem.price?.price ?? 0,
          },
          metaDescription: '',
          rowVersion: '',
        },
      };
      cart.cartItems.push(cartItem);
    }

    //#endregion
    //#region create cartBill
    var totalPrice = 0;
    cart.cartItems.forEach((item) => {
      var price = item.product.productPrice;
      totalPrice += (price.price - (price.price * price.discount) / 100) * item.amount;
    });

    var cartBill: ICartBill = {
      totalDiscountPrice: 0,
      totalPayPrice: totalPrice,
      totalPrice: totalPrice,
      totalShippingPrice: 0,
      totalTaxPrice: 0,
    };
    cart.cartBill = cartBill;
    //#endregion

    return cart;
  }
  private _deleteCartItemLocaly(cartItemEdit: ICartItemEdit) {
    var cart = localStorageService.get<ICart>(LocalStorageKeys.CART);
    if (cart != undefined) {
      var cartItemIndex = cart.cartItems.findIndex(
        (x) => x.product.productId == cartItemEdit.productId && x.product.productColor.id == cartItemEdit.colorId,
      );

      if (cartItemIndex != -1) {
        cart.cartItems.splice(cartItemIndex);
      }
      var totalPrice = 0;
      cart.cartItems.forEach((item) => {
        var price = item.product.productPrice;
        totalPrice += (price.price - (price.price * price.discount) / 100) * item.amount;
      });
      var cartBill: ICartBill = {
        totalDiscountPrice: 0,
        totalPayPrice: totalPrice,
        totalPrice: totalPrice,
        totalShippingPrice: 0,
        totalTaxPrice: 0,
      };
      cart.cartBill = cartBill;
      localStorageService.set(LocalStorageKeys.CART, cart);
    }
  }
  private _editProductQuantityLocaly(cartItemAmount: ICartItemEdit) {
    var cart = localStorageService.get<ICart>(LocalStorageKeys.CART);
    if (cart != undefined) {
      var cartItem = cart.cartItems.find(
        (x) => x.product.productId == cartItemAmount.productId && x.product.productColor.id == cartItemAmount.colorId,
      );

      if (cartItem != undefined) {
        cartItem.amount = cartItemAmount.amount;
      }
      var totalPrice = 0;
      cart.cartItems.forEach((item) => {
        var price = item.product.productPrice;
        totalPrice += (price.price - (price.price * price.discount) / 100) * item.amount;
      });
      var cartBill: ICartBill = {
        totalDiscountPrice: 0,
        totalPayPrice: totalPrice,
        totalPrice: totalPrice,
        totalShippingPrice: 0,
        totalTaxPrice: 0,
      };
      cart.cartBill = cartBill;
      localStorageService.set(LocalStorageKeys.CART, cart);
    }
  }
  private _calculateTotalPriceFromCartItem(cartItems: Array<ICartItem>): number {
    var totalPrice = 0;
    cartItems.map((cartItem) => {
      var price =
        (cartItem.product.productPrice.price -
          (cartItem.product.productPrice.price * cartItem.product.productPrice.discount) / 100) *
        cartItem.amount;

      totalPrice += price;
    });
    return totalPrice;
  }
  private _transformCartToBriefCart(cartItems: Array<ICartItem>): Array<IBriefCartItem> {
    return cartItems.map((cartItem) => {
      var price =
        (cartItem.product.productPrice.price -
          (cartItem.product.productPrice.price * cartItem.product.productPrice.discount) / 100) *
        cartItem.amount;
      return {
        id: cartItem.product.productId,
        amount: cartItem.amount,
        price: priceFormat(price, 'fa', 'تومان'),
        title: cartItem.product.productName,
        metaDescription: cartItem.product.metaDescription,
        previewImage: cartItem.product.productPreviewImage,
      };
    });
  }
}

//#region singleton export
const cartService = new CartService();
export { cartService };
//#endregion
