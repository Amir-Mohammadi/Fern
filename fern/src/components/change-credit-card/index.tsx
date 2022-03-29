import { useState } from 'react';
import NumberFormat from 'react-number-format';
import styles from './change-credit-card.module.scss';

interface props {
  onSubmitChange?: (creditCardNumber: string) => void;
}

export type ChangeCreditCardModalProps = props;
const ChangeCreditCardModal: React.FC<ChangeCreditCardModalProps> = (props) => {
  const [creditCardNumber, setCreditCardNumber] = useState('');
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <span>شماره کارت</span>
          <NumberFormat
            value={creditCardNumber}
            onValueChange={({ value }) => {
              setCreditCardNumber(value);
            }}
            format="####-####-####-####"
          />
        </div>
      </div>
      <div className={styles.formFT}>
        <button
          className={styles.success}
          onClick={() => {
            props.onSubmitChange!(creditCardNumber);
          }}>
          ثبت
        </button>
      </div>
    </div>
  );
};

export default ChangeCreditCardModal;
