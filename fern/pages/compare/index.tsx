import CompareContainer from '@Containers/compare-container';
import FooterContainer from '@Containers/footer-container';
import Head from 'next/head';
import React from 'react';

const ProductComparePage = () => {
  return (
    <div style={{ flexDirection: 'column' }}>
      <Head>
        <title>فروشگاه السل</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CompareContainer />
      <FooterContainer />
    </div>
  );
};

export default ProductComparePage;
