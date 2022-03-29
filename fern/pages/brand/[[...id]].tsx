import Error from '@Components/screens/error-screen';
import BrandContainer from '@Containers/brand-container';
import FooterContainer from '@Containers/footer-container';
import BrandService from '@Services/brandService';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React from 'react';
import { PageProps } from '../../src/utils/types';

const BrandPage: React.FC<PageProps> = (props: PageProps) => {
  if (props.error) {
    return <Error statusCode={props.error.statusCode} />;
  }
  return (
    <div style={{ flexDirection: 'column' }}>
      <Head>
        <title key="title">{`فروشگاه السل | ${props.seoData?.pageTitle}`}</title>
        <meta key="description" name="description" content={props.seoData?.metaDescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BrandContainer />
      <FooterContainer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  try {
    const brandService = new BrandService();
    const brandId: number | null = getCategoryId(context.query.id);
    // const productSearchParameters = productQueryStringService.transformProductsQueryStringToSearchParameters(
    //   context.query as IProductsQueryString,
    //   categoryId,
    // );

    if (!brandId) {
      return {
        props: {
          error: {
            statusCode: 404,
          },
        },
      };
    }

    const { brand, seoData } = await brandService.getBrandInfo(brandId);

    return {
      props: {
        initialMobxState: {
          brandStore: {
            brand,
          },
        },
        seoData,
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

const getCategoryId = (brandId?: string | string[] | undefined) => {
  console.log(brandId);
  if (!brandId) {
    return null;
  }

  if (!isNaN(Number(brandId[0]))) {
    return Number(brandId[0]);
  }

  return null;
};

export default BrandPage;
