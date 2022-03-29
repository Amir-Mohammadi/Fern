import FooterContainer from '@Containers/footer-container';
import LoginContainer from '@Containers/login-container';
import { PageProps } from '@Utils/types';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React from 'react';

const LoginRegisterPage: React.FC<PageProps> = (props: PageProps) => {
  return (
    <div style={{ flexDirection: 'column' }}>
      <Head>
        <title>فروشگاه السل</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoginContainer />
      <FooterContainer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  // only make the component server side
  return {
    props: {},
  };
};

export default LoginRegisterPage;
