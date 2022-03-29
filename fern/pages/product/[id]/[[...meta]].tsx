//#region import
import FooterContainer from '@Containers/footer-container';
import { apiService } from '@Services';
import { urlService } from '@Services/url';
import { Stores } from '@Stores';
import { isApiError } from '@Utils/api-error';
import { withToken } from '@Utils/hof/server-side-props-middleware';
import { PageProps } from '@Utils/types';
import ProductContainer from 'containers/product-container';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React, { useEffect } from 'react';
//#endregion

const ProductPage: React.FC<PageProps> = (props: PageProps) => {
  useEffect(() => {
    Stores?.product.onFetchData();
  }, []);

  return (
    <div style={{ flexDirection: 'column' }}>
      <Head>
        <title>فروشگاه السل</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProductContainer />
      <FooterContainer />
    </div>
  );
};

//#region server side
export const getServerSideProps: GetServerSideProps<PageProps> = withToken(async (context) => {
  try {
    const productId = urlService.productUrlService.extractProductIdFromProductUrl(context.params?.id);
    const product = await apiService.v1.MarketApi.getMarketStuff(productId);

    const [productBrochure, productMainProperties, productColors, productImages, productPrices] = await Promise.all([
      apiService.v1.MarketApi.getMarketBrochure(productId),
      apiService.v1.MarketApi.getMarketMainProperties(productId),
      apiService.v1.MarketApi.getMarketStuffColors(productId),
      apiService.v1.MarketApi.getMarketStuffImages(productId),
      apiService.v1.MarketApi.getMarketStuffPrices(productId),
    ]);

    return {
      props: {
        initialMobxState: {
          productStore: {
            product,
            productBrochure,
            productMainProperties,
            productColors,
            productImages,
            productPrices,
          },
        },
      },
    };
  } catch (error) {
    console.error(error);
    if (isApiError(error) && error.code == 1016) {
      // resource not found
      return {
        notFound: true,
      };
    }

    return {
      props: {
        error: { statusCode: 500, title: 'مشکلی از جانب سرور پیش آمده است' },
      },
    };
  }
});
//#endregion

export default ProductPage;
