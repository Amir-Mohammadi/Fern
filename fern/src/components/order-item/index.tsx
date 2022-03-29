import BriefCartItem from '@Components/brief-cart-item';
import { Icons, LeftSwipe } from '@Components/icons';
import { IUserOrder } from '@Interfaces/common/user-orders';
import React from 'react';
import styles from './order-item.module.scss';

export enum Mode {
  primary = '#24AFFF',
  danger = '#DB0060',
  warning = '#FF9124',
  success = '#009289',
  light = '#AAAAAA',
}
interface Props {
  order: IUserOrder;
  // onDeleteOrder: (order: IOrder) => void;
  // onPayoffOrder: (order: IOrder) => void;
  // orderUrl: string;
}
export type OrderItemProps = Props;
const OrderItem: React.FC<OrderItemProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.pay}>{props.order.purchasedAt}</div>
        <div className={styles.show}>
          <span> مشاهده سفارش</span>
          <Icons icon={LeftSwipe} color={'#149289'} secondColor={'#149289'} size={13} />
        </div>
      </div>
      <div className={styles.middle}>
        <div className={styles.orderItem}>
          <BriefCartItem
            product={{
              id: props.order.id,
              brand: props.order.brandName ?? '',
              color: props.order.colorName,
              colorHexCode: props.order.colorCode,
              image: props.order.imageUrl,
              title: props.order.productName ?? '',
              price: props.order.productPrice,
              city: props.order.city,
              isAvailableShipping: true,
            }}
          />
        </div>
        {/* <div className={styles.price}>
          <span>مبلغ سفارش : {props.orderCostDetail?.orderCost} تومان</span>
          <span>هزینه ارسال : {props.orderCostDetail?.deliveryCost} تومان</span>
          <span>مبلغ قابل پرداخت : {props.orderCostDetail?.totalCost} تومان</span>
        </div> */}
      </div>
      <div className={styles.bottom}>
        {/* <div
          style={{
            color: '#FF9124',
            fontSize: '14px',
            fontWeight: 'lighter',
            padding: '0 26px',
          }}>
          درصورت عدم پرداخت بعد ۵۹ دقیقه این سفارش خود بخود حذف می گردد
        </div>
        <div className={styles.actions}>
          <button className={styles.deleteButton} onClick={() => props.onDeleteOrder(props.order)}>
            <Icons type={IconTypes.Delete} size={24} color={'#d3d3d3'} />
          </button>
          <button className={styles.payButton} onClick={() => props.onPayoffOrder(props.order)}>
            پرداخت و ثبت نهایی سفارش
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default OrderItem;
