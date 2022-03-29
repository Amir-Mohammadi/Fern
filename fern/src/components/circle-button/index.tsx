import Button from '@Components/button';
import { Add, Icons } from '@Components/icons';
import { Gradient } from '@Constants/colors';
import React from 'react';
import styles from './circle-button.module.scss';

interface Props {
  text: string;
  tooltip?: string;
  mode: Gradient;
  disable?: boolean;
  icon?: string;
  onClick: () => any;
  size?: number;
}

type AddAddressProps = Props;

const AddAddress: React.FC<AddAddressProps> = (props) => {
  return (
    <div className={styles.Container}>
      <Button.Basic
        buttonClassName={styles.Shape}
        style={{
          borderColor: props.disable ? '#808080' : props.mode.baseColor,
          backgroundColor: props.disable ? '#d9d9d9' : props.mode.secondColor,
          cursor: 'inherit',
        }}
        onClick={props.disable ? () => {} : props.onClick}>
        <div className={styles.Icon}>
          <Icons icon={Add} color={props.disable ? '#808080' : props.mode.baseColor} size={20} />
        </div>
      </Button.Basic>
      <div className={styles.TextDiv}>
        <p
          className={styles.text}
          style={{
            color: props.disable ? '#808080' : props.mode.baseColor,
          }}>
          {props.text}
        </p>
      </div>
    </div>
  );
};

export default AddAddress;
