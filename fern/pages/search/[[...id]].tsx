import FooterContainer from '@Containers/footer-container';
import { IProductsQueryString } from '@Interfaces/api';
import { apiService } from '@Services/api';
import ProductsService from '@Services/products.service';
import { withToken } from '@Utils/hof/server-side-props-middleware';
import { queryBuilder } from '@Utils/queryBuilder';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React from 'react';
import SearchContainer from '../../src/containers/search-container';
import productQueryStringService from '../../src/services/stores/product-query-string.service';
import { PageProps } from '../../src/utils/types';

const SearchPage: React.FC<PageProps> = (props: PageProps) => {
  return (
    <div style={{ flexDirection: 'column' }}>
      <Head>
        <title>فروشگاه السل</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchContainer />
      <FooterContainer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<PageProps> = withToken(async (context) => {
  try {
    const productService = new ProductsService();
    const categoryId: number | null = getCategoryId(context.query.id);
    const productSearchParameters = productQueryStringService.transformProductsQueryStringToSearchParameters(
      context.query as IProductsQueryString,
      categoryId,
    );

    const products = await productService.getMarketBriefStuffs(queryBuilder(context.query));

    const productCategoryTree = await apiService.v1.MarketApi.getMarketProductCategories(categoryId ?? undefined);

    const marketBrands = await apiService.v1.MarketApi.getMarketBrands();

    return {
      props: {
        initialMobxState: {
          searchStore: {
            products: products,
            searchParameters: productSearchParameters,
            productCategory: productCategoryTree,
            productBrands: marketBrands,
            categoryId: categoryId,
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

const getCategoryId = (categoryId?: string | Array<string>) => {
  if (categoryId == undefined) {
    return null;
  }

  if (!isNaN(Number(categoryId[0]))) {
    return Number(categoryId[0]);
  }

  throw new Error('category id is not a number');
};

export default SearchPage;
