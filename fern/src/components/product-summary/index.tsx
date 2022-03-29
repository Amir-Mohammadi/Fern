import Button from '@Components/button';
import { AvailableWarehouse, Guarantee, Icons, ProductSeller, SendByElsell } from '@Components/icons';
import { Mode } from '@Constants/colors';
import Badge, { Shapes } from '../badge';
import styles from './product-summary.module.scss';

interface Props {
  guaranty?: string;
  deliveryType?: DeliveryType;
  offer?: number;
  realPrice: string;
  finalPrice: string;
  AddToCart: Function;
}

export enum DeliveryType {
  SendByElsell = 'ارسال توسط السل',
  SendByOthers = 'ارسال توسط دیگران',
}

export type ProductSummaryProps = Props;
const ProductSummary: React.FC<ProductSummaryProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.sellerContainer}>
        <Icons icon={ProductSeller} color="#707070" size={25} />
        <div className={styles.seller}>
          <label>فروشنده: </label>
          <label className={styles.fontWeight}> فروشگاه اینترنتی السل</label>
        </div>
      </div>
      <div className={styles.guaranteeContainer}>
        <Icons icon={Guarantee} color="#707070" size={20} />
        <div className={styles.seller}>
          <label>{props.guaranty ? props.guaranty : 'گارانتی اصالت و سلامت فیزیکی کالا'}</label>
        </div>
      </div>
      <div className={styles.availabilityContainer}>
        <div className={styles.availability}>
          <Icons icon={AvailableWarehouse} color="#707070" secondColor="#db0060" size={25} />
          <div className={styles.seller}>
            <label>موجود در انبار السل</label>
          </div>
        </div>
        <div className={styles.productSender}>
          <div className={styles.sellerIcon}>
            <Icons icon={SendByElsell} color="#D3D3D3" size={14} secondColor="#db0060" />
          </div>
          <div className={styles.sellerLabel}>
            <label>{props.deliveryType ? props.deliveryType : DeliveryType.SendByElsell}</label>
          </div>
        </div>
      </div>
      <div className={styles.detailContainer}>
        {props.offer && props.offer > 0 ? (
          <div className={styles.offer}>
            <label className={styles.realPrice}>{props.realPrice} </label>
            <Badge value={'%' + props.offer?.toString()} max={99} shape={Shapes.Circle} mode={Mode.danger} />
          </div>
        ) : null}

        <div className={styles.discountPrice}>
          <label>{props.finalPrice}</label>
        </div>
        <Button.Basic onClick={props.AddToCart} buttonClassName={styles.addToCart}>
          <label className={styles.addToCartLabel}>افزودن به سبد </label>
        </Button.Basic>
      </div>
    </div>
  );
};

export default ProductSummary;
