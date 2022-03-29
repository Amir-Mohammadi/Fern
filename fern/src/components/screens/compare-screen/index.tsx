import PopUp from '@Components/pop-up';
import { ProductCompareItemProps } from '@Components/product-compare-item';
import ProductItem, { ProductItemProps } from '@Components/product-item';
import ProductListForCompare from '@Components/product-list-for-compare';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { queryParser } from '@Utils/query-parser';
import React, { FC, useEffect, useState } from 'react';
import styles from './compare-screen.module.scss';

export enum Target {
  FORM_LOAD = 'compare-product-form-load',
  LOAD_PRODUCTS = 'compare-product-load-products',
  ADD_PRODUCT_TO_COMPARE = 'compare-product-add-product-to-compare',
  REMOVE_PRODUCT_FROM_COMPARE = 'compare-product-remove-product-from-compare',
}

export type ComparePropertiesType = {
  id: number;
  mainKey: string;
  items: Array<{ id: number; key: string; values: Array<{ productId: number; value: string }> }>;
};

interface props {
  productsToCompare: Array<ProductItemProps>;
  products: Array<ProductCompareItemProps>;
  properties: Array<ComparePropertiesType>;
  action: (target: Target, value?: any) => void;
}

export type ComparScreenProps = props;

const CompareScreen: FC<ComparScreenProps> = (props) => {
  const orders: Array<number> = [];
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const param = queryParser(urlSearchParams);

    props.action(Target.FORM_LOAD, param);
    return () => {};
  }, []);

  const [popup, setPopup] = useState(false);

  return (
    <div className={styles.container}>
      {props.productsToCompare.length ? (
        <div className={styles.content}>
          <div className={styles.productList}>
            {props.productsToCompare.map((product, i) => {
              orders.push(product.id);
              return (
                <div className={styles.productItem} key={product.id}>
                  <ProductItem {...product} />
                  {props.productsToCompare.length > 1 && (
                    <div className={styles.productItemOptions}>
                      <button onClick={() => props.action(Target.REMOVE_PRODUCT_FROM_COMPARE, i)}>
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
            {props.productsToCompare.length < 4 && (
              <div className={styles.addProductBtn}>
                <button
                  onClick={() => {
                    props.action(Target.LOAD_PRODUCTS);
                    setPopup(true);
                  }}>
                  افزودن محصول
                </button>
              </div>
            )}
          </div>
          <div className={styles.productPropertiesList}>
            {props.properties.map((property) => {
              return (
                <div className={styles.propertyItem} key={property.id}>
                  <span className={styles.mainKey}>{property.mainKey}</span>
                  {property.items.map((item) => {
                    return (
                      <div className={styles.propertyKey} key={`${item.id}-${property.id}`}>
                        <span className={styles.propertyKeyItem}>{item.key}</span>
                        <div className={styles.valuesList}>
                          {orders.map((order) => {
                            return (
                              <div className={styles.valueGroupe}>
                                {item.values.map((value) => {
                                  if (order == value.productId) {
                                    return <span>{value.value}</span>;
                                  } else {
                                    return null;
                                  }
                                })}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className={styles.emptyContent}>
          <span>محصولی برای مقایسه وجود ندارد</span>
        </div>
      )}
      {popup && (
        <PopUp
          title={'انتخاب محصول'}
          message={
            <ProductListForCompare
              productList={props.products}
              onClick={(index) => {
                props.action(Target.ADD_PRODUCT_TO_COMPARE, index);
                setPopup(false);
              }}
            />
          }
          onClose={() => setPopup(false)}
        />
      )}
    </div>
  );
};

export default CompareScreen;
