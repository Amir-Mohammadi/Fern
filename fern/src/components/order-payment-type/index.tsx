import RadioButton from '@Components/radio-button';
import React from 'react';

interface Props {
  paymentTypes: Array<string>;
  selectedPaymentType: number;
  onPaymentTypeChange: (index: number) => any;
}

export type OrderPaymentTypeProps = Props;
const OrderPaymentType: React.FC<OrderPaymentTypeProps> = (props) => {
  return (
    <div style={{ flexDirection: 'column' }}>
      <div
        style={{
          fontSize: '20px',
          color: '#707070',
          flex: 'none',
          padding: '10px 40px',
        }}>
        نحوه پرداخت
      </div>
      {props.paymentTypes.map((paymentType, index) => (
        <div
          key={index + 'payment-type'}
          style={{
            fontSize: '20px',
            color: '#707070',
            flex: 'none',
            padding: '10px 30px',
            fontWeight: 300,
          }}>
          <RadioButton
            text={paymentType}
            value={index == props.selectedPaymentType}
            onChange={() => {
              props.onPaymentTypeChange(index);
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default OrderPaymentType;
