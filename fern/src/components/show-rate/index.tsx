import classnames from 'classnames';
import styles from './show-rate.module.scss';

interface Props {
  attributes: { title: string; value: number }[];
}

export type ShowRateProps = Props;

export enum Status {
  'خیلی ضعیف',
  'ضعیف',
  'متوسط',
  'خوب',
  'خیلی خوب',
  'عالی',
}

const ShowRate: React.FC<ShowRateProps> = (props) => {
  let bars = (value: number) => {
    const a = [];
    for (let i = 0; i <= 5; i++) {
      a.push(
        <div
          key={i}
          className={classnames({
            [styles.bar]: true,
            [styles.rated]: i < value,
          })}></div>,
      );
    }
    return a;
  };
  return (
    <div className={styles.container}>
      {props.attributes?.map((attr, index) => {
        return (
          <div className={styles.rateContainer} key={index}>
            <div className={styles.labelContainer}>
              <label>{attr.title}</label>
            </div>
            <div className={styles.shapeContainer}>
              <div style={{ flex: 'none', alignItems: 'center' }}>{bars(attr.value)}</div>
            </div>
            <div className={styles.valueContainer}>
              <label>{Status[attr.value - 1]}</label>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ShowRate;
