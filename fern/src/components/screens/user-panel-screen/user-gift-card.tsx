import Shapes, { ShapeTypes } from '@Components/shapes';
import React from 'react';
import styles from './user-panel.module.scss';

interface Props {
  giftCard?: string;
}

export type UserGiftCardProps = Props;

const UserGiftCard: React.FC<UserGiftCardProps> = (props) => (
  <div className={styles.favoriteBX}>
    {props.giftCard ? (
      props.giftCard
    ) : (
      <div className={styles.shape}>
        <Shapes type={ShapeTypes.NoGiftCard} />
        <span>هیچ کارت هدیه ای برای شما ثبت نشده است.</span>
      </div>
    )}
  </div>
);

export default UserGiftCard;
