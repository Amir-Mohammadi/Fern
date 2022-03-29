import BriefCartItem from '@Components/brief-cart-item';
import { DeliveryOnPlace, Icons } from '@Components/icons';
import { Mode } from '@Constants/colors';
import { ICartItemInfo } from '@Interfaces/common/cart-item-info';
import React from 'react';
import { DateTimeNode } from '.';
import styles from './shipping.module.scss';

interface Props {
  deliveryDateTimeList?: Array<DateTimeNode>;
  deliveryDateIndex?: number;
  setShippingDate?: (index: number) => any;
  deliveryTimeIndex?: number;
  setDeliveryTime?: (index: number) => any;

  cartItemInfos: Array<ICartItemInfo>;
}

export type ParchesProductProps = Props;

const ParchesProduct: React.FC<ParchesProductProps> = (props) => {
  const renderProduct = (cartItem: ICartItemInfo, index: number) => {
    return (
      <div className={styles.productItem} key={index}>
        <div className={styles.numberOfLabel}>{`مرسوله ${index + 1} از ${props.cartItemInfos.length}`}</div>
        <div className={styles.sellerLabel}>
          <Icons icon={DeliveryOnPlace} color="#707070" secondColor={Mode.danger} size={29} />
          ارسال مستقیم توسط فروشگاه اینترنتی السل
        </div>

        <BriefCartItem
          product={{
            id: cartItem.productId,
            title: cartItem.productName,
            brand: cartItem.brandName,
            color: cartItem.colorName,
            image: cartItem.imageUrl,
            colorHexCode: cartItem.colorHexCode,
            price: cartItem.price,
            city: cartItem.city,
            metaDescription: cartItem.metaDescription,
            isAvailableShipping: cartItem.isAvailableShipping,
          }}
        />
      </div>
    );
  };

  return (
    <div className={styles.products}>{props.cartItemInfos.map((product, index) => renderProduct(product, index))}</div>
  );
};

export default ParchesProduct;
