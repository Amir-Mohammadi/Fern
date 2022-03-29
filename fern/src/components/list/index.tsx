import { DeliveryOnPlace, Icons } from '@Components/icons';
import { Mode } from '@Constants/colors';
import Separator from '../separator';
import styles from './list.module.scss';

interface Props {
  productTotalPrice: string;
  numberOfProducts: number;
  shippingCost: string;
  couponCost: string;
  taxPrice: string;
  totalPayPrice: string;
}

export type ListProps = Props;
const List: React.FC<ListProps> = (props) => {
  return (
    <div
      style={{
        flexDirection: 'column',
        padding: '5px 0',
      }}>
      <div className={styles.rowDiv}>
        <div style={{ flex: 1 }}>
          <label> قیمت کالاها ({props.numberOfProducts})</label>
        </div>
        <div style={{ flex: 1, justifyContent: 'flex-end' }}>
          <label>{props.productTotalPrice}</label>
        </div>
      </div>
      <Separator />
      <div className={styles.rowDiv}>
        <div style={{ flex: 1 }}>
          <label> جمع</label>
        </div>
        <div className={styles.valueDIv}>
          <label>{props.productTotalPrice}</label>
        </div>
      </div>
      <div className={styles.rowDiv}>
        <div style={{ flex: 1, alignItems: 'center' }}>
          <Icons icon={DeliveryOnPlace} size={20} secondColor={Mode.danger} color="#707070" />
          <label style={{ padding: '0 2px', fontSize: '10px' }}>هزینه ارسال</label>
        </div>
        <div
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            fontSize: '10px',
            paddingLeft: '10px',
          }}>
          <label> {props.shippingCost} </label>
        </div>
      </div>
      <Separator />
      <div className={styles.rowDiv}>
        <div style={{ flex: 1 }}>
          <label style={{ padding: '0 2px' }}> مالیات بر ارزش افزوده</label>
        </div>
        <div style={{ flex: 1, justifyContent: 'flex-end' }}>
          <label>{props.taxPrice} </label>
        </div>
      </div>

      <Separator />
      {props.couponCost != '' && (
        <div className={styles.rowDiv}>
          <div style={{ flex: 1 }}>
            <label style={{ padding: '0 2px' }}> تخفیف</label>
          </div>
          <div style={{ flex: 1, justifyContent: 'flex-end' }}>
            <label>{props.couponCost} </label>
          </div>
        </div>
      )}
      {props.couponCost != '' && <Separator />}
      <div className={styles.rowDiv}>
        <div style={{ flex: 1 }}>
          <label style={{ padding: '0 2px' }}> مبلغ کل</label>
        </div>
        <div style={{ flex: 1, justifyContent: 'flex-end' }}>
          <label>{props.totalPayPrice}</label>
        </div>
      </div>
    </div>
  );
};

export default List;
