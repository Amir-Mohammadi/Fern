import FooterContainer from '@Containers/footer-container';
import { apiService } from '@Services';
import authService from '@Services/common/auth.service';
import { OrderStep } from '@Stores/order-store';
import { withToken } from '@Utils/hof/server-side-props-middleware';
import { PageProps } from '@Utils/types';
import { GetServerSideProps } from 'next';
import React from 'react';
import OrderContainer from '../../src/containers/order-container';

const ShippingPage: React.FC<PageProps> = (props: PageProps) => {
  return (
    <div style={{ flexDirection: 'column' }}>
      <OrderContainer />
      <FooterContainer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<PageProps> = withToken(async (context) => {
  try {
    const cart = await apiService.v1.CustomerApi.getCart();
    const addresses = await apiService.v1.UserApi.getUserAddresses();
    if (cart.id == undefined) {
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
      };
    } else {
      return {
        props: {
          initialMobxState: {
            orderStore: {
              orderStep: OrderStep.Shipping,
              cart: cart,
              addresses: addresses,
            },
          },
        },
      };
    }
  } catch (error) {
    console.error(error);
    if (authService.getToken() === undefined) {
      return {
        notFound: true,
      };
    } else {
      return {
        props: {
          error: {
            statusCode: 500,
          },
        },
      };
    }
  }
});

export default ShippingPage;
