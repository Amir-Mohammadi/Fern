import FooterContainer from '@Containers/footer-container';
import { apiService } from '@Services';
import { urlService } from '@Services/url';
import { withToken } from '@Utils/hof/server-side-props-middleware';
import { PageProps } from '@Utils/types';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import styles from './payment-fail.module.scss';

const PaymentFailedPage: React.FC<PageProps> = (props: PageProps) => {
  return (
    <div style={{ flexDirection: 'column' }}>
      <Head>
        <title>فروشگاه السل</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <div className={styles.errorbox}>
          <h3>پرداخت شما ناموفق می باشد</h3>
          <a href={'/'}>باز گشت به صفحه اصلی</a>
        </div>
      </div>
      <FooterContainer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<PageProps> = withToken(async (context) => {
  try {
    const paymentId = parseCheckPaymentInfo(context.query);
    await apiService.v1.PaymentApi.checkOrderPaymentVisit(paymentId);
    await apiService.v1.PaymentApi.setOrderPaymentVisit(paymentId);
    return {
      props: {},
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
});

export const parseCheckPaymentInfo = (params: ParsedUrlQuery): string => {
  return urlService.paymentUrlService.parsePaymentId(params.payment_id);
};

export default PaymentFailedPage;
