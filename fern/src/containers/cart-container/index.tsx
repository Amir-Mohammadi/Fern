import CartScreen from '@Components/screens/cart-screen';
import { InjectedCartStore } from '@Stores/cart-store';
import { ComponentWithStore, connect } from '@Stores/core/decorator';
import { observer } from 'mobx-react';
import React from 'react';

@connect('cartStore')
@observer
class CartContainer extends ComponentWithStore<InjectedCartStore> {
  componentDidMount() {
    this.stores.cartStore.onFetchData();
  }
  render() {
    return (
      <CartScreen
        popUp={this.stores.cartStore.popUp}
        cartItemProps={{
          onIncreaseQuantity: (index) => {
            this.stores.cartStore.onIncreaseQuantity(index);
          },
          onDecreaseQuantity: (index) => {
            this.stores.cartStore.onDecreaseQuantity(index);
          },
          onDeleteCartItem: (index) => {
            this.stores.cartStore.onDeleteCartItem(index);
          },
          cartItems: this.stores.cartStore.cartItemInfos,
          totalDeliveryPrice: this.stores.cartStore.totalDeliveryPrice,
        }}
        checkoutBillProps={{
          confirmButtonDisabled: this.stores.cartStore.confirmButtonDisable,
          confirmButtonTitle: this.stores.cartStore.confirmButtonTitle,
          onConfirmButton: () => {
            this.stores.cartStore.onConfirmButton();
          },
          billData: {
            numberOfProducts: this.stores.cartStore.cartItemsLength,
            productTotalPrice: this.stores.cartStore.totalPrice,
            shippingCost: this.stores.cartStore.totalDeliveryPrice,
            couponCost: '',
            taxPrice: this.stores.cartStore.taxPrice,
            totalPayPrice: this.stores.cartStore.totalPayPrice,
          },
        }}
        confirmButtonDisabled={this.stores.cartStore.confirmButtonDisable}
        confirmButtonTitle={this.stores.cartStore.confirmButtonTitle}
      />
    );
  }
}

export default CartContainer;
