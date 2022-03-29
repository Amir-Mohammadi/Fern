import { PaymentStatus } from '@Interfaces/common/payment-status';
import { apiService } from '@Services/api';
import { urlService } from '@Services/url';
import { withToken } from '@Utils/hof/server-side-props-middleware';
import { PageProps } from '@Utils/types';
import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

const CheckPaymentPage: React.FC<PageProps> = (props: PageProps) => {
  return (
    <h1
      style={{
        margin: 'auto',
      }}>
      در حال انتقال می باشید .....
    </h1>
  );
};

export const getServerSideProps: GetServerSideProps<PageProps> = withToken(async (context) => {
  try {
    const paymentId = parseCheckPaymentInfo(context.query);
    await apiService.v1.PaymentApi.checkOrderPaymentVisit(paymentId);
    const paymentStatus = await apiService.v1.CustomerApi.getOrderPaymentStatus(paymentId);

    switch (paymentStatus.status) {
      case PaymentStatus.Done:
        return {
          redirect: {
            destination: '/checkout?order_id=' + paymentStatus.orderId,
            permanent: false,
          },
        };

      case PaymentStatus.Failed:
        return {
          redirect: {
            destination: '/payment-fail?payment_id=' + paymentId,
            permanent: false,
          },
        };

      default:
        return {
          notFound: true,
        };
    }
  } catch (error) {
    return {
      props: {
        error: {
          statusCode: 500,
        },
      },
    };
  }
});

export const parseCheckPaymentInfo = (params: ParsedUrlQuery): string => {
  return urlService.paymentUrlService.parsePaymentId(params.payment_id);
};

export default CheckPaymentPage;
