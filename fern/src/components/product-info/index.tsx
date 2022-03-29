import { IconGenerator, Icons } from '@Components/icons';
import styles from './product-info.module.scss';

type Props = {
  info: Array<{
    title: string;
    descriptions: Array<{ label: string; value: string; icon: IconGenerator }>;
  }>;
};
const ProductInfo: React.FC<Props> = (props) => {
  return (
    <div className={styles.productInfo}>
      {props.info?.map((item) => {
        return (
          <div className={styles.info}>
            <div className={styles.body}>
              <div className={styles.title}>{item.title}</div>
              {item.descriptions?.map((desc) => {
                return (
                  <div className={styles.description}>
                    <div className={styles.label}>
                      <Icons size={17} icon={desc.icon} color="#707070" />
                      <span>{desc.label}</span>
                    </div>
                    <div className={styles.value}>{desc.value}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductInfo;
