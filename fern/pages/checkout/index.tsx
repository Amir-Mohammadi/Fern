import FooterContainer from '@Containers/footer-container';
import OrderContainer from '@Containers/order-container';
import { apiService } from '@Services';
import { urlService } from '@Services/url';
import { OrderStep } from '@Stores/order-store';
import { withToken } from '@Utils/hof/server-side-props-middleware';
import { PageProps } from '@Utils/types';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

const CheckoutPage: React.FC<PageProps> = (props: PageProps) => {
  return (
    <div style={{ flexDirection: 'column' }}>
      <Head>
        <title>فروشگاه السل</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <OrderContainer />
      <FooterContainer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<PageProps> = withToken(async (context) => {
  try {
    const orderId = parseOrderCheckoutInfo(context.query);
    const checkout = await apiService.v1.CustomerApi.getCheckout(orderId);

    return {
      props: {
        initialMobxState: {
          orderStore: {
            orderStep: OrderStep.Checkout,
            orderSummary: checkout,
          },
        },
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        error: {
          statusCode: 500,
        },
      },
    };
  }
});

export const parseOrderCheckoutInfo = (params: ParsedUrlQuery): string => {
  return urlService.paymentUrlService.parseOrderId(params.order_id);
};

export default CheckoutPage;
