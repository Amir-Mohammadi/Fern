import React from 'react';
import ToastItem, { ToastItemProps } from './toast-item';
import styles from './toast.module.scss';

interface props {
  list: Array<ToastItemProps>;
  updateList: (id: number) => void;
}

export type ToastProps = props;

const Toast: React.FC<ToastProps> = (props) => {
  return (
    <div className={styles.container}>
      {props.list.map((toast) => (
        <ToastItem {...toast} unMountMe={(id) => props.updateList(id)} key={toast.id} />
      ))}
    </div>
  );
};

export default Toast;
