import Button from '@Components/button';
import List, { ListProps } from '@Components/list';
import { Mode } from '@Constants/colors';
import React from 'react';
import styles from './checkout-bill.module.scss';

interface Props {
  confirmButtonTitle: string;
  onConfirmButton: () => void;
  confirmButtonDisabled: boolean;
  billData: ListProps;
}

export type CheckoutBillProps = Props;

const CheckoutBill: React.FC<CheckoutBillProps> = (props) => {
  return (
    <div className={styles.container} style={{ flexDirection: 'column', minHeight: '395px' }}>
      <div style={{ flex: 'none' }}>
        <List {...props.billData} />
      </div>
      <div style={{ alignItems: 'flex-end', padding: '0 20px 40px' }}>
        <Button.Block
          text={props.confirmButtonTitle}
          onClick={() => {
            props.onConfirmButton();
          }}
          disabled={props.confirmButtonDisabled}
          mode={Mode.danger}
        />
      </div>
    </div>
  );
};

export default CheckoutBill;
