import FooterContainer from '@Containers/footer-container';
import LoginContainer from '@Containers/login-container';
import { urlService } from '@Services/url';
import { LoginData } from '@Stores/auth-store';
import { PageProps } from '@Utils/types';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

const LoginConfirmPage: React.FC<PageProps> = (props: PageProps) => {
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
  try {
    const loginData = parseLoginInformation(context.query);

    return {
      props: {
        initialMobxState: {
          loginStore: {
            loginData,
          },
        },
      },
    };
  } catch (error) {
    console.error(error);

    return {
      redirect: {
        destination: '/login-register',
        permanent: false,
      },
    };
  }
};

export const parseLoginInformation = (params: ParsedUrlQuery): LoginData => {
  const token = urlService.loginUrlService.parseLoginToken(params.token);
  const authenticateType = urlService.loginUrlService.parseAuthenticateType(params.authenticateType);
  const isOptional = urlService.loginUrlService.parseIsOptional(params.isOptional);

  return {
    authenticateType: authenticateType,
    isOptional: isOptional,
    token: token,
  };
};

export default LoginConfirmPage;
