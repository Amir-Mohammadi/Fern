import { Cart } from '@Components/icons';
import CompanyIcon from './company-icons';
import Join from './join';
import Social from './social-network';
import styles from './source.module.scss';
import Title from './title';

const Footer: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.footerMenu}>
        <Title
          title={'راهنمای خرید از السل'}
          items={[
            { title: 'نحوه ثبت نام', url: '#' },
            { title: 'نحوه سفارش گزاری', url: '#' },
            { title: 'نحوه ارسال کالا', url: '#' },
          ]}
        />

        <Title
          title={'خدمات مشتریان'}
          items={[
            { title: 'قوانین و مقررات', url: '#' },
            { title: 'شرایط ارجاع کالا', url: '#' },
            { title: 'چگونه فروشنده شوید ؟ ', url: '#' },
            { title: 'عضویت در خبرنامه', url: '#' },
            { title: 'رسیدگی به شکایات', url: '#' },
          ]}
        />
        <Title
          title={'السل'}
          items={[
            { title: 'درباره السل', url: '#' },
            { title: 'فرصت های شغلی', url: '#' },
            { title: 'تماس با ما', url: '#' },
          ]}
        />
      </div>

      <Join title="عضویت در خبرنامه السل" button={[{ title: 'عضویت', onClick: () => {} }]} />

      <Social title={'ما را در رشبکه های اجتماعی دنبال کنید'} button={[{ icon: Cart, url: '#' }]} />

      <CompanyIcon button={[{ icon: Cart, url: '#' }]} />
    </div>
  );
};
export default Footer;
