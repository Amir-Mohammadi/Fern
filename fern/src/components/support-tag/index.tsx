import { DeliveryOnPlace, Icons, Mark, PayOnPlace, ProductReturn, Support } from '@Components/icons';
import { Mode } from '@Constants/colors';
import styles from './support.module.scss';

interface Props {
  mode?: Mode;
}

export type SupportProps = Props;

const SupportTag: React.FC<SupportProps> = (props) => {
  return (
    <div className={styles.Container}>
      <div className={styles.Content}>
        <div className={styles.IconBx}>
          <div className={styles.Icon}>
            <Icons icon={DeliveryOnPlace} color={Mode.light} secondColor={Mode.danger} size={110} />
          </div>
          <div className={styles.Text}>تحویل کالا در محل</div>
        </div>

        <div className={styles.IconBx}>
          <div className={styles.Icon}>
            <Icons icon={Support} color={Mode.light} secondColor={Mode.danger} size={90} />
          </div>
          <div className={styles.Text}>پشتیبانی ۲۴ ساعته</div>
        </div>
        <div className={styles.IconBx}>
          <div className={styles.Icon}>
            <Icons icon={PayOnPlace} color={Mode.light} secondColor={Mode.danger} size={100} />
          </div>
          <div className={styles.Text}>پرداخت در محل</div>
        </div>
        <div className={styles.IconBx}>
          <div className={styles.Icon}>
            <Icons icon={ProductReturn} color={Mode.light} secondColor={Mode.danger} size={100} />
          </div>
          <div className={styles.Text}>ارجاع کالا به مدت ۷ روز</div>
        </div>
        <div className={styles.IconBx}>
          <div className={styles.Icon}>
            <Icons icon={Mark} color={Mode.light} secondColor={Mode.danger} size={75} />
          </div>
          <div className={styles.Text}>ضمانت اصالت کالا</div>
        </div>
      </div>
    </div>
  );
};

export default SupportTag;
