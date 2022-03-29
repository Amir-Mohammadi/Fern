import CartItems, { CartItemProps } from '@Components/cart-item';
import CheckoutBill, { CheckoutBillProps } from '@Components/checkout-bill';
import PopUP, { PopUpProps } from '@Components/pop-up';
import SupportTag from '@Components/support-tag';
import React from 'react';
import styles from './shipping.module.scss';

interface Props {
  confirmButtonTitle: string;
  confirmButtonDisabled: boolean;
  cartItemProps: CartItemProps;
  checkoutBillProps: CheckoutBillProps;
  popUp: { status: boolean; data: PopUpProps };
}

export type _ShoppingProps = Props;

const CartScreen: React.FC<_ShoppingProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.informationContainer}>
          <div className={styles.information}>
            <div className={styles.sideBar}>
              <div className={styles.card}>
                <CartItems {...props.cartItemProps} />
              </div>
            </div>
          </div>
          <div className={styles.sideBar}>
            <div className={styles.card}>
              <CheckoutBill {...props.checkoutBillProps} />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerContainer}>
        <div className={styles.support}>
          <SupportTag />
        </div>
      </div>
      {props.popUp.status && <PopUP {...props.popUp.data} />}
    </div>
  );
};

export default CartScreen;
