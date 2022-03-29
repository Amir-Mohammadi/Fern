import OrderScreen from '@Components/screens/order-screen';
import { ComponentWithStore, connect } from '@Stores/core/decorator';
import { InjectedOrderStore } from '@Stores/order-store';
import { observer } from 'mobx-react';
import React from 'react';

@connect('orderStore')
@observer
class OrderContainer extends ComponentWithStore<InjectedOrderStore> {
  render() {
    return (
      <OrderScreen
        shippingStep={this.stores.orderStore.orderStep}
        orderCheckoutBankBills={this.stores.orderStore.checkoutBankBills}
        parchesProductProps={{
          cartItemInfos: this.stores.orderStore.cartItemInfos,
        }}
        checkoutBillProps={{
          billData: {
            numberOfProducts: this.stores.orderStore.totalNumberOfProducts,
            productTotalPrice: this.stores.orderStore.totalProductPrice,
            shippingCost: this.stores.orderStore.totalDeliveryPrice,
            couponCost: this.stores.orderStore.couponCost,
            taxPrice: this.stores.orderStore.taxPrice,
            totalPayPrice: this.stores.orderStore.totalPayPrice,
          },

          confirmButtonDisabled: this.stores.orderStore.confirmButtonDisable,
          confirmButtonTitle: this.stores.orderStore.confirmButtonTitle,
          onConfirmButton: () => {
            this.stores.orderStore.onConfirmButton();
          },
        }}
        orderPaymentTypeProps={{
          onPaymentTypeChange: () => {},
          paymentTypes: ['آنلاین'],
          selectedPaymentType: 0,
        }}
        orderSummeryList={this.stores.orderStore.orderSummeryList}
        orderAddressesProps={{
          changeSelectedAddress: (index) => {
            this.stores.orderStore.setSelectedAddress(index);
          },

          provinceList: this.stores.orderStore.provinceList,
          cityList: this.stores.orderStore.cityList,
          addresses: this.stores.orderStore.userAddresses,
          selectedAddressIndex: this.stores.orderStore.userSelectedAddressIndex,
          loadProvincesList: () => this.stores.orderStore.loadProvinceList(),
          loadCitiesList: (provinceId: number) => this.stores.orderStore.loadCitiesList(provinceId),
          onAddNewAddress: (newAddress, callBack) => {
            this.stores.orderStore.addNewAddress(newAddress, callBack);
          },
        }}
        discountCodeProps={{
          discountCodeValue: this.stores.orderStore.couponCode,
          isFolded: this.stores.orderStore.isCouponSectionFolded,
          hasCoupon: this.stores.orderStore.hasCoupon,

          onDiscountCodeConfirm: () => {
            this.stores.orderStore.onApplyCouponCode();
          },
          onDiscountCodeValueChange: (value) => {
            this.stores.orderStore.setCouponCode(value);
          },
          onToggleFoldedMode: () => {
            this.stores.orderStore.toggleCouponFolded();
          },
          isErrorMode: false,
        }}
      />
    );
  }
}

export default OrderContainer;
