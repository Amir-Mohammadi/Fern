import CheckoutBill, { CheckoutBillProps } from '@Components/checkout-bill';
import OrderAddresses, { OrderAddressesProps } from '@Components/order-addresses';
import DiscountCode, { DiscountCodeProps } from '@Components/order-discount-code';
import OrderPaymentType, { OrderPaymentTypeProps } from '@Components/order-payment-type';
import Table from '@Components/table';
import { urlService } from '@Services/url';
import { OrderStep } from '@Stores/order-store';
import React from 'react';
import ParchesProduct, { ParchesProductProps } from './product';
import _Shipping, { ShoppingPageTypes } from './shipping';

export interface DateTimeNode {
  title: string;
  timeList: Array<string>;
}

export interface OrderSummeryItem {
  title: string;
  id?: number;
  metaDescription?: string;
}

export interface OrderSummery {
  cargo: OrderSummeryItem;
  seller: OrderSummeryItem;
  departTime: OrderSummeryItem;
  price: OrderSummeryItem;
  discount: OrderSummeryItem;
  totalPrice: OrderSummeryItem;
  amount: OrderSummeryItem;
}

export interface OrderCheckoutBankBill {
  billDateTime: string;
  orderNum: string;
  paymentNum: string;
  refNum: string;
}
interface Props {
  shippingStep: OrderStep;
  parchesProductProps: ParchesProductProps;
  orderAddressesProps: OrderAddressesProps;
  checkoutBillProps: CheckoutBillProps;
  orderPaymentTypeProps: OrderPaymentTypeProps;
  orderSummeryList: Array<OrderSummery>;
  orderCheckoutBankBills: Array<OrderCheckoutBankBill>;
  discountCodeProps: DiscountCodeProps;
}

export type ShoppingProps = Props;
const generateProductUrl = (productId: number, metaDescription: string): string => {
  return urlService.productUrlService.createProductUrl(productId ?? 0, metaDescription);
};
const OrderScreen: React.FC<ShoppingProps> = (props) => {
  let address = <OrderAddresses {...props.orderAddressesProps} />;
  let product = <ParchesProduct {...props.parchesProductProps} />;
  let factor = <CheckoutBill {...props.checkoutBillProps} />;

  let paymentType = <OrderPaymentType {...props.orderPaymentTypeProps} />;

  let discountCode = <DiscountCode {...props.discountCodeProps} />;

  let productList = (
    <div style={{ flexDirection: 'column', padding: '20px' }}>
      <div>خلاصه سفارش</div>
      <Table
        headers={['مرسوله', 'تعداد', 'فروشنده', 'زمان ارسال', 'قیمت', ' تخفیف', 'قیمت کل']}
        rows={props.orderSummeryList.map((orderSummery) => {
          return [
            {
              text: orderSummery.cargo.title,
              url: generateProductUrl(orderSummery.cargo.id ?? 0, orderSummery.cargo.metaDescription ?? ''),
            },
            { text: orderSummery.amount.title },
            { text: orderSummery.seller.title },
            { text: orderSummery.departTime.title },
            { text: orderSummery.price.title },
            { text: orderSummery.discount.title },
            { text: orderSummery.totalPrice.title },
          ];
        })}
      />
    </div>
  );
  let infoData = (
    <div style={{ flexDirection: 'column', padding: '20px' }}>
      <div>اطلاعات جهت پیگری</div>
      <Table
        headers={['تاریخ', 'شماره فاکتور', 'کد پرداخت', 'کد پیگیری']}
        rows={props.orderCheckoutBankBills.map((bankBill) => {
          return [
            { text: bankBill.billDateTime },
            { text: bankBill.orderNum },
            { text: bankBill.paymentNum },
            { text: bankBill.refNum },
          ];
        })}
      />
    </div>
  );
  const steps = [{ title: 'اطلاعات ارسال' }, { title: 'پرداخت' }, { title: 'اتمام خرید و ارسال' }];

  const renderPage = () => {
    switch (props.shippingStep) {
      case 0: {
        return (
          <_Shipping
            mainBarComponents={[address, product]}
            sideBarComponents={[factor]}
            steps={steps}
            currentStep={0}
            type={ShoppingPageTypes.Normal}
          />
        );
      }

      case 1: {
        return (
          <_Shipping
            mainBarComponents={[paymentType, discountCode, productList]}
            sideBarComponents={[factor]}
            steps={steps}
            currentStep={1}
            type={ShoppingPageTypes.Normal}
          />
        );
      }
      case 2: {
        return (
          <_Shipping
            mainBarComponents={[infoData, productList]}
            sideBarComponents={[factor]}
            steps={steps}
            currentStep={2}
            type={ShoppingPageTypes.Normal}
          />
        );
      }
      default: {
        return null;
      }
    }
  };

  return renderPage();
};

export default OrderScreen;
