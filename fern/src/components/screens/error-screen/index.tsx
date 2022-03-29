import Button from '@Components/button';
import Footer from '@Components/footer';
import Header from '@Components/header';
import React from 'react';
import styles from './error.module.scss';

export type ErrorProps = {
  statusCode: 500 | 404;
  title?: string;
};

const Error: React.FC<ErrorProps> = (props) => {
  if (props.statusCode == 500) {
    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.content}>
          <div className={styles.sliderBar}>
            <h1 className={styles.h1}>{'با عرض پوزش، مشکلی در سایت پیش آمده است!!!'}</h1>
            <div>
              <Button.Rounded
                text={'بازگشت به صفحه اصلی'}
                onClick={() => {
                  window.location.href = '/';
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles.footerContainer}>
          <div className={styles.footer}>
            <Footer />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.content}>
          <div className={styles.sliderBar}>
            <h1 className={styles.h1}>{'کاربر گرامی،صفحه مورد نظر شما یافت نشد!!!'}</h1>
            <div>
              <Button.Rounded
                text={'بازگشت به صفحه اصلی'}
                onClick={() => {
                  window.location.href = '/';
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles.footerContainer}>
          <div className={styles.footer}>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
};

export default Error;
