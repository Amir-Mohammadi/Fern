import { Icons, ProductSeller } from '@Components/icons';
import { Gradients, Mode } from '@Constants/colors';
import { urlService } from '@Services/url';
import React from 'react';
import Badge, { Shapes } from '../badge';
import OfferShape from '../offer-shape';
import styles from './product-item.module.scss';

interface Props {
  offer?: boolean; //show offerShape or not
  text: string;
  realPrice: number;
  hasSellingStock: boolean | null;
  discountPrice: number | null;
  discountRate?: number | null;
  image?: { src: string; alt?: string; title?: string };
  postTime?: number;
  onClick?: () => void;
  id: number;
  metaDescription: string;
}
export type ProductItemProps = Props;
const ProductItem: React.FC<ProductItemProps> = (props) => {
  const generateProductUrl = (productId: number, metaDescription: string): string => {
    return urlService.productUrlService.createProductUrl(productId ?? 0, metaDescription);
  };
  const Availability = () => {
    if (props.hasSellingStock == true) {
      return (
        <div className={styles.wareHouse}>
          <Icons icon={ProductSeller} size={16} color={Mode.success} />
          <label style={{ color: Mode.success }}> موجود در انبار </label>
        </div>
      );
    } else {
      return (
        <div className={styles.wareHouse}>
          <Icons icon={ProductSeller} size={16} color={'#db0060'} />
          <label style={{ color: '#db0060' }}>ناموجود</label>
        </div>
      );
    }
  };

  return (
    <div className={styles.container}>
      {props.offer ? (
        <div className={styles.shapeContainer}>
          <OfferShape text="فروش ویژه" mode={Gradients.danger} />
        </div>
      ) : null}

      <div className={styles.imageContainer}>
        <a href={generateProductUrl(props.id, props.metaDescription)}>
          <img className={styles.image} src={props.image?.src} alt={props.image?.alt} title={props.image?.title} />
        </a>
      </div>
      <div className={styles.details}>
        <div className={styles.textContainer}>
          <a href={generateProductUrl(props.id, props.metaDescription)}>{props.text}</a>
        </div>

        <div className={styles.offerContainer}>
          {Availability()}
          {props.offer ? (
            <div className={styles.offer}>
              <label className={styles.realPrice}>{props.realPrice}</label>
              <Badge
                value={props.discountRate ? '%' + props.discountRate?.toString() : '0'}
                max={10}
                shape={Shapes.Circle}
                mode={Mode.danger}
              />
            </div>
          ) : null}
        </div>
        <div className={styles.offerContainer}>
          <div className={styles.offer}>
            <label>{props.offer ? props.discountPrice : props.realPrice} تومان</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
