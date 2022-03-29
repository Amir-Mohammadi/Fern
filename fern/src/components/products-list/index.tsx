import React from 'react';
import ProductItem, { ProductItemProps } from '../product-item';
import styles from './products-list.module.scss';

interface Props {
  products: ProductItemProps[];
}

export type ProductListProps = Props;

const proructsRender = (product: ProductItemProps, i: number) => (
  <div className={styles.product} key={i + '_ProductList'}>
    <ProductItem {...product} />
  </div>
);

const ProductsList: React.FC<ProductListProps> = (props) => {
  return <div className={styles.container}>{props.products.map(proructsRender)}</div>;
};

export default ProductsList;
