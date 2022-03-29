import ProductCompareItem, { ProductCompareItemProps } from '@Components/product-compare-item';
import React from 'react';
import styles from './product-list-for-compare.module.scss';

interface props {
  productList: Array<ProductCompareItemProps>;
  onClick: (index: number) => void;
}

export type ProductListForCompareProps = props;

const ProductListForCompare: React.FC<ProductListForCompareProps> = (props) => {
  return (
    <div className={styles.container}>
      {props.productList.map((product, i) => {
        return (
          <div className={styles.productItem} onClick={() => props.onClick(i)}>
            <ProductCompareItem {...product} />
          </div>
        );
      })}
    </div>
  );
};

export default ProductListForCompare;
