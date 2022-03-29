import ProductItem, { ProductItemProps } from '@Components/product-item';
import TabBar, { TabBarTypes } from '@Components/tab-bar';
import React, { FC, useEffect, useState } from 'react';
import styles from './brand-screen.module.scss';

export enum Target {
  FORM_LOAD = 'brand-screen-form-load',
  GET_PRODUCTS = 'brand-screen-getProducts',
}

export type BrandInfo = { id: number; title: string; image: { src: string; alt?: string; title?: string } };

interface props {
  brand: BrandInfo;
  categories: Array<{ title: string; id: number }>;
  products: Array<ProductItemProps>;
  action: (target: Target, value?: any) => void;
}

export type BrandScreenProps = props;

const BrandScreen: FC<BrandScreenProps> = (props) => {
  useEffect(() => {
    props.action(Target.FORM_LOAD);
    return () => {};
  }, []);

  const [tabBarSelectedTabIndex, setTabBarTabIndex] = useState(0);

  return (
    <div className={styles.container}>
      <div className={styles.brand}>
        <img {...props.brand.image} />
        <span>{props.brand.title}</span>
      </div>
      <div className={styles.categoryContent}>
        {props.categories.length ? (
          <TabBar
            items={props.categories}
            selectedIndex={tabBarSelectedTabIndex}
            setSelectedIndex={(i) => {
              setTabBarTabIndex(i);
              props.action(Target.GET_PRODUCTS, props.categories[i].id);
            }}
            styleType={TabBarTypes.ProductTabs}
            content={renderProductList(props.products)}
          />
        ) : (
          <div className={styles.emptyHandler}>برند موردنظر فاقد دسته بندی میباشد</div>
        )}
      </div>
    </div>
  );
};

export default BrandScreen;

const renderProductList = (products: ProductItemProps[]) => {
  return (
    <div className={styles.productList}>
      {products.map((product) => (
        <div key={product.id + '_ProductItemSlider'} className={styles.productItem}>
          <ProductItem {...product} />
        </div>
      ))}
    </div>
  );
};
