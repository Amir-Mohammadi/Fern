import FooterContainer from '@Containers/footer-container';
import OrderContainer from '@Containers/order-container';
import { apiService } from '@Services';
import { OrderStep } from '@Stores/order-store';
import { withToken } from '@Utils/hof/server-side-props-middleware';
import { PageProps } from '@Utils/types';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React from 'react';

const PaymentPage: React.FC<PageProps> = (props: PageProps) => {
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
    const cart = await apiService.v1.CustomerApi.getCart();

    return {
      props: {
        initialMobxState: {
          orderStore: {
            orderStep: OrderStep.Payment,
            cart: cart,
          },
        },
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        error: { statusCode: 500 },
      },
    };
  }
});

export default PaymentPage;
