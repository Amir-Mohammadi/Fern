import FooterContainer from '@Containers/footer-container';
import HomeContainer from '@Containers/home-container';
import { PageProps } from '@Utils/types';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React from 'react';

export default function Home() {
  return (
    <div style={{ flexDirection: 'column' }}>
      <Head>
        <title>فروشگاه السل</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeContainer />
      <FooterContainer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  return {
    props: {},
  };
};
