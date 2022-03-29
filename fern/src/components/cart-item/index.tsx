import AmountButton from '@Components/amount-button';
import { Delete, DeliveryOnPlace, Icons } from '@Components/icons';
import VariantComponent from '@Components/variant-component';
import { ICartItemInfo } from '@Interfaces/common/cart-item-info';
import { urlService } from '@Services/url';
import React from 'react';
import styles from './cart-item.module.scss';

export enum Mode {
  primary = '#24AFFF',
  danger = '#DB0060',
  warning = '#FF9124',
  success = '#009289',
  light = '#AAAAAA',
}
interface Props {
  totalDeliveryPrice: string;
  cartItems: Array<ICartItemInfo>;
  onDeleteCartItem: (productIndex: number) => any;
  onIncreaseQuantity: (productIndex: number) => any;
  onDecreaseQuantity: (productIndex: number) => any;
}

export type CartItemProps = Props;

const generateBriefProductUrl = (productId: number, metaDescription: string): string => {
  return urlService.productUrlService.createProductUrl(productId ?? 0, metaDescription);
};
const CartItems: React.FC<CartItemProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.iDontCareAboutNamingAnyMoreContainer}>
        <div className={styles.iDontCareAboutNamingAnyMore}>
          <Icons icon={DeliveryOnPlace} color={'red'} />
          <span>ارسال کالای خریداری شده</span>
        </div>
      </div>
      {props.cartItems.length == 0 ? (
        <div style={{ margin: '30px 0' }}>سبد خرید شما خالی می باشد</div>
      ) : (
        props.cartItems.map((cartItem, index) => (
          <div className={styles.item} key={'cart-item-' + index}>
            <div className={styles.itemName}>
              <a
                href={generateBriefProductUrl(cartItem.productId, cartItem.metaDescription)}
                className={styles.imageSelection}>
                {cartItem.productName}
              </a>
            </div>
            <div className={styles.itemInfo}>
              <div className={styles.image}>
                <a
                  href={generateBriefProductUrl(cartItem.productId, cartItem.metaDescription)}
                  className={styles.imageSelection}>
                  <img src={cartItem.imageUrl} alt={cartItem.imageAlt} />{' '}
                </a>
              </div>

              <div className={styles.itemParams}>
                <div>
                  <span>قیمت:&nbsp;</span>
                  <span>{cartItem.price}</span>
                </div>
                <div>
                  <span>برند:&nbsp;</span>
                  <span>{cartItem.brandName}</span>
                </div>
                <div>
                  <span>رنگ:&nbsp;</span>
                  <span>
                    <VariantComponent
                      selectedIndex={false}
                      title={cartItem.colorName}
                      color={cartItem.colorHexCode}
                      onSelect={() => {}}
                    />
                  </span>
                </div>
                <div>
                  <span>شهر:&nbsp;</span>
                  <span>{cartItem.city}</span>
                </div>
              </div>
            </div>
            <div className={styles.itemActions}>
              <AmountButton
                onIncrease={() => {
                  props.onIncreaseQuantity(index);
                }}
                onDecrease={() => {
                  props.onDecreaseQuantity(index);
                }}
                value={cartItem.amount}
              />
              <div
                className={styles.removeAction}
                onClick={() => {
                  props.onDeleteCartItem(index);
                }}
                style={{ margin: '0 20px' }}>
                <Icons icon={Delete} size={19} color={'#DB0060'} />
                <span>حذف سفارش</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CartItems;
