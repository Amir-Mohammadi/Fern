import OrderItem from '@Components/order-item';
import Shapes, { ShapeTypes } from '@Components/shapes';
import TabBar, { TabBarTypes } from '@Components/tab-bar';
import { ShoppingStatus } from '@Interfaces/common';
import { OrderItemStatusType } from '@Interfaces/common/order-item-status-type';
import { IUserOrder } from '@Interfaces/common/user-orders';
import React, { useEffect, useState } from 'react';
import styles from './user-panel.module.scss';
interface Props {
  orders: IUserOrder[];
  getOrders: () => void;
}

export type UserOrdersProps = Props;

const UserOrders: React.FC<UserOrdersProps> = (props) => {
  useEffect(() => {
    props.getOrders();
    return () => {};
  }, []);

  const [tabIndex, setTabIndex] = useState<ShoppingStatus>(ShoppingStatus.InProgress);
  return (
    <TabBar
      items={[
        // {
        //   title: 'در انتظار پرداخت',
        //   content: paymentWaiting(props.orders),
        //   countBadge: badgeCounter(props.orders, ShoppingStatus.PAYMENT_WAITING),
        // },
        {
          title: 'در حال پردازش',
          content: processing(props.orders),
          countBadge: badgeCounter(props.orders, OrderItemStatusType.InProgress),
        },
        {
          title: 'تایید شده توسط تامین کننده',
          content: acceptByProvider(props.orders),
          countBadge: badgeCounter(props.orders, OrderItemStatusType.Prepared),
        },
        {
          title: 'در حال ارسال',
          content: sending(props.orders),
          countBadge: badgeCounter(props.orders, OrderItemStatusType.Sended),
        },
        {
          title: 'تحویل شده',
          content: delivered(props.orders),
          countBadge: badgeCounter(props.orders, OrderItemStatusType.Delivered),
        },
        {
          title: 'مرجوعی',
          content: refereed(props.orders),
          countBadge: badgeCounter(props.orders, OrderItemStatusType.Returned),
        },
        {
          title: 'لغو شده',
          content: cancelled(props.orders),
          countBadge: badgeCounter(props.orders, OrderItemStatusType.Cancelled),
        },
      ]}
      styleType={TabBarTypes.OrderTabes}
      selectedIndex={tabIndex}
      setSelectedIndex={(index) => setTabIndex(index)}
    />
  );
};

export default UserOrders;

// const paymentWaiting = (orders: IOrder[]) => {
//   const instruct: IOrder[] = [];
//   orders.forEach((order) => {
//     if (order.status == ShoppingStatus.PAYMENT_WAITING) {
//       instruct.push(order);
//     }
//   });
//   return (
//     <div className={styles.ordersBX}>
//       {instruct.length ? (
//         <div className={styles.tabContent}>
//           {instruct.map((order, index) => (
//             <OrderItem {...order} />
//           ))}
//         </div>
//       ) : (
//         <div className={styles.shape}>
//           <Shapes type={ShapeTypes.NoPaymentOrder} />
//           <span>شما سفارشی در انتظار پرداخت ندارید.</span>
//         </div>
//       )}
//     </div>
//   );
// };

const processing = (orders: IUserOrder[]) => {
  const instruct: IUserOrder[] = [];
  orders.forEach((order) => {
    if (order.status == OrderItemStatusType.InProgress) {
      instruct.push(order);
    }
  });
  return (
    <div className={styles.ordersBX}>
      {instruct.length ? (
        <div className={styles.tabContent}>
          {instruct.map((order) => (
            <OrderItem order={order} />
          ))}
        </div>
      ) : (
        <div className={styles.shape}>
          <Shapes type={ShapeTypes.NoPaymentOrder} />
          <span>شما سفارشی در حال پردازش ندارید.</span>
        </div>
      )}
    </div>
  );
};

const acceptByProvider = (orders: IUserOrder[]) => {
  const instruct: IUserOrder[] = [];
  orders.forEach((order) => {
    if (order.status == OrderItemStatusType.Prepared) {
      instruct.push(order);
    }
  });
  return (
    <div className={styles.ordersBX}>
      {instruct.length ? (
        <div className={styles.tabContent}>
          {instruct.map((order) => (
            <OrderItem order={order} />
          ))}
        </div>
      ) : (
        <div className={styles.shape}>
          <Shapes type={ShapeTypes.NoPaymentOrder} />
          <span>شما سفارشی در حال پردازش ندارید.</span>
        </div>
      )}
    </div>
  );
};

const sending = (orders: IUserOrder[]) => {
  const instruct: IUserOrder[] = [];
  orders.forEach((order) => {
    if (order.status == OrderItemStatusType.Sended) {
      instruct.push(order);
    }
  });
  return (
    <div className={styles.ordersBX}>
      {instruct.length ? (
        <div className={styles.tabContent}>
          {instruct.map((order) => (
            <OrderItem order={order} />
          ))}
        </div>
      ) : (
        <div className={styles.shape}>
          <Shapes type={ShapeTypes.NoPaymentOrder} />
          <span>شما سفارشی در حال ارسالی ندارید.</span>
        </div>
      )}
    </div>
  );
};

const delivered = (orders: IUserOrder[]) => {
  const instruct: IUserOrder[] = [];
  orders.forEach((order) => {
    if (order.status == OrderItemStatusType.Delivered) {
      instruct.push(order);
    }
  });
  return (
    <div className={styles.ordersBX}>
      {instruct.length ? (
        <div className={styles.tabContent}>
          {instruct.map((order) => (
            <OrderItem order={order} />
          ))}
        </div>
      ) : (
        <div className={styles.shape}>
          <Shapes type={ShapeTypes.NoPaymentOrder} />
          <span>شما سفارشی برای تحویل ندارید.</span>
        </div>
      )}
    </div>
  );
};

const refereed = (orders: IUserOrder[]) => {
  const instruct: IUserOrder[] = [];
  orders.forEach((order) => {
    if (order.status == OrderItemStatusType.Returned) {
      instruct.push(order);
    }
  });
  return (
    <div className={styles.ordersBX}>
      {instruct.length ? (
        <div className={styles.tabContent}>
          {instruct.map((order) => (
            <OrderItem order={order} />
          ))}
        </div>
      ) : (
        <div className={styles.shape}>
          <Shapes type={ShapeTypes.NoPaymentOrder} />
          <span>شما سفارشی مرجوعی ندارید.</span>
        </div>
      )}
    </div>
  );
};

const cancelled = (orders: IUserOrder[]) => {
  const instruct: IUserOrder[] = [];
  orders.forEach((order) => {
    if (order.status == OrderItemStatusType.Cancelled) {
      instruct.push(order);
    }
  });
  return (
    <div className={styles.ordersBX}>
      {instruct.length ? (
        <div className={styles.tabContent}>
          {instruct.map((order) => (
            <OrderItem order={order} />
          ))}
        </div>
      ) : (
        <div className={styles.shape}>
          <Shapes type={ShapeTypes.NoPaymentOrder} />
          <span>شما سفارش لغو شده ای ندارید.</span>
        </div>
      )}
    </div>
  );
};

const badgeCounter = (orders: IUserOrder[], status: OrderItemStatusType) => {
  const instruct = [];

  orders.forEach((order) => {
    if (order.status == status) {
      instruct.push(order);
    }
  });

  return instruct.length;
};
