import Shapes, { ShapeTypes } from '@Components/shapes';
import React from 'react';
import styles from './user-panel.module.scss';

interface Props {
  massages?: string;
}

export type UserMassageProps = Props;

const UserMassage: React.FC<UserMassageProps> = (props) => (
  <div className={styles.favoriteBX}>
    {props.massages ? (
      props.massages
    ) : (
      <div className={styles.shape}>
        <Shapes type={ShapeTypes.NoMassaging} />
        <span>برای شما هیچ پیامی ارسال نشده است.</span>
      </div>
    )}
  </div>
);

export default UserMassage;
