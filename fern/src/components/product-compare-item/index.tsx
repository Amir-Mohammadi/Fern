import React from 'react';
import styles from './product-compare-item.module.scss';

interface Props {
  id: number;
  offer?: boolean; //show offerShape or not
  text: string;
  realPrice: number;
  discountPrice: number | null;
  image?: { src: string; alt?: string; title?: string };
}
export type ProductCompareItemProps = Props;
const ProductCompareItem: React.FC<ProductCompareItemProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={props.image?.src} alt={props.image?.alt} title={props.image?.title} />
      </div>
      <div className={styles.details}>
        <div className={styles.textContainer}>{props.text}</div>
        <div className={styles.offerContainer}>
          <div className={styles.offer}>
            <label>{props.offer ? props.discountPrice : props.realPrice} تومان</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCompareItem;
