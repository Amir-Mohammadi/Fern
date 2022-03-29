import VariantComponent from '@Components/variant-component';
import { urlService } from '@Services/url';
import classNames from 'classnames';
import React from 'react';
import styles from './brief-cart-item.module.scss';

export enum Mode {
  primary = '#24AFFF',
  danger = '#DB0060',
  warning = '#FF9124',
  success = '#009289',
  light = '#AAAAAA',
}

interface Props {
  product: {
    id: number;
    title?: string;
    brand?: string;
    color?: string;
    image?: string;
    colorHexCode?: string;
    price?: string;
    city?: string;
    metaDescription?: string;
    isAvailableShipping?: boolean;
  };
  onClick?: () => {};
}

export type BriefCartItemProps = Props;

const generateBriefProductUrl = (productId: number, metaDescription: string): string => {
  return urlService.productUrlService.createProductUrl(productId ?? 0, metaDescription);
};

const BriefCartItem: React.FC<BriefCartItemProps> = (props) => {
  return (
    <div
      className={classNames({ [styles.container]: true, [styles.notAvailable]: !props.product.isAvailableShipping })}>
      <div className={styles.image}>
        <a
          href={generateBriefProductUrl(props.product.id, props.product.metaDescription ?? '')}
          className={styles.imageSelection}>
          <img src={props.product.image} />
        </a>
      </div>

      <div className={styles.itemParams}>
        <div>
          <span>قیمت:&nbsp;</span>
          <span>{props.product.price}</span>
        </div>
        <div>
          <span>برند:&nbsp;</span>
          <span>{props.product.brand}</span>
        </div>
        <div>
          <span>رنگ:&nbsp;</span>
          <span>
            <VariantComponent
              selectedIndex={false}
              title={props.product.color || ''}
              color={props.product.colorHexCode || '#ffffff'}
              onSelect={() => {}}
            />
          </span>
        </div>
        <div>
          <span>{props.product.city ? 'شهر:' + props.product.city : ''}</span>
        </div>
      </div>
    </div>
  );
};

export default BriefCartItem;
