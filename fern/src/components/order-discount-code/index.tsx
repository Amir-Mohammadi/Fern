import Button from '@Components/button';
import { DownSwipe, Icons, LeftSwipe } from '@Components/icons';
import { Mode } from '@Constants/colors';
import React from 'react';
import styles from './order-discount-code.module.scss';

interface Props {
  discountCodeValue: string;
  isFolded: boolean;
  hasCoupon: boolean;
  onDiscountCodeValueChange: (value: string) => any;
  onDiscountCodeConfirm: () => void;
  onToggleFoldedMode: () => void;
  isErrorMode: boolean;
  errorMessage?: string;
}

export type DiscountCodeProps = Props;
const DiscountCode: React.FC<DiscountCodeProps> = (props) => {
  const renderFoldedMode = () => {
    return (
      <div style={{ padding: '20px', alignItems: 'center', cursor: 'pointer' }} onClick={props.onToggleFoldedMode}>
        <div>کد تخفیف یا کارت هدیه</div>
        <Icons icon={LeftSwipe} size={20} />
      </div>
    );
  };

  const renderUnfoldedMode = () => {
    return (
      <div style={{ padding: '20px', alignItems: 'center', margin: '0 20px', flexDirection: 'column' }}>
        <div
          style={{ justifyContent: 'space-between', width: '100%', marginBottom: '20px', cursor: 'pointer' }}
          onClick={props.onToggleFoldedMode}>
          <div>کد تخفیف یا کارت هدیه</div>
          <Icons icon={DownSwipe} size={20} />
        </div>
        <div style={{ justifyContent: 'flex-start', width: '100%' }}>
          <input
            type=""
            value={props.discountCodeValue}
            style={{
              borderRadius: '20px',
              textAlign: 'center',
              borderColor: props.isErrorMode ? 'red' : 'black',
              borderStyle: 'solid',
              fontSize: '1rem',
              height: '100%',
            }}
            onChange={(event) => {
              props.onDiscountCodeValueChange(event.target.value);
            }}
          />
          <Button.Basic
            buttonClassName={styles.button}
            text={props.hasCoupon ? 'حذف کد تخفیف' : 'اعمال کد تخفیف'}
            mode={props.hasCoupon ? Mode.primary : Mode.danger}
            onClick={() => {
              props.onDiscountCodeConfirm();
            }}
          />
        </div>
      </div>
    );
  };

  if (props.isFolded) {
    return renderFoldedMode();
  } else {
    return renderUnfoldedMode();
  }
};

export default DiscountCode;
