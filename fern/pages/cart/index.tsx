import CartContainer from '@Containers/cart-container';
import FooterContainer from '@Containers/footer-container';
import { PageProps } from '@Utils/types';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React from 'react';

const CartPage: React.FC<PageProps> = (props: PageProps) => {
  return (
    <div style={{ flexDirection: 'column' }}>
      <Head>
        <title>فروشگاه السل</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CartContainer />
      <FooterContainer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  try {
    return {
      props: {
        initialMobxState: {},
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
};

export default CartPage;
