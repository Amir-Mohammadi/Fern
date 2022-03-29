import Button from '@Components/button';
import { Icons, LeftSwipe, ProductSeller } from '@Components/icons';
import { PageUrls } from '@Constants/page-urls';
import { IBriefCartItem } from '@Interfaces/common';
import { IBriefCart } from '@Interfaces/common/brief-cart';
import { urlService } from '@Services/url';
import styles from './cart-item-summary.module.scss';

interface Props {
  cart: IBriefCart;
  Submit?: () => void;
}

export type CartItemSummaryProps = Props;
const cartVisibleItems = 4;
const CartItemSummary: React.FC<CartItemSummaryProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button.Basic href={PageUrls.Cart}>
          <label>مشاهده سبد خرید</label>
          <Icons icon={LeftSwipe} size={20} color="#009289" />
        </Button.Basic>
      </div>

      <div className={styles.productContainer}>{props.cart.cartItems.map(availability)}</div>
      <div className={styles.paymentContainer}>
        <div className={styles.AmountContainer}>
          <label>مبلغ قابل پرداخت</label>
          <label>{props.cart.totalPrice} </label>
        </div>
        <Button.Basic onClick={props.Submit} text={'ثبت سفارش'} />
      </div>
    </div>
  );
};

export default CartItemSummary;

const generateProductUrl = (productId: number, metaDescription: string): string => {
  return urlService.productUrlService.createProductUrl(productId ?? 0, metaDescription);
};
const availability = (item: IBriefCartItem, i: number) => {
  if (i < cartVisibleItems) {
    return (
      <div className={styles.contentContainer} key={i}>
        <div className={styles.imageContainer}>
          <a href={generateProductUrl(item.id, item.metaDescription ?? '')}>
            <img src={item.previewImage?.imageUrl} />
          </a>
        </div>
        <div className={styles.detailContainer}>
          <label className={styles.title}>
            <a href={generateProductUrl(item.id, item.metaDescription ?? '')}>
              {item.title.length < 35 ? item.title : item.title.slice(0, 21) + '...'}
            </a>
          </label>
          <div className={styles.productAmountContainer}>
            <label>{item.amount + ' عدد '}</label>
          </div>
          <div className={styles.productAmountContainer}>
            <label>{item.price}</label>
          </div>
          <div className={styles.availabilityContainer}>
            <Icons icon={ProductSeller} size={12} color={item.amount == 1 ? '#db0060' : '#009289'} />
            {item.amount == 1 ? (
              <label style={{ color: '#db0060', padding: ' 0 5px' }}>فقط 1 عدد باقیست</label>
            ) : item.amount >= 1 && item.amount <= 6 ? (
              <label style={{ padding: ' 0 5px' }}>{item.amount.toString() + '  ' + 'عدد موجود در انبار'}</label>
            ) : (
              <label style={{ padding: ' 0 5px' }}>موجود در انبار</label>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
