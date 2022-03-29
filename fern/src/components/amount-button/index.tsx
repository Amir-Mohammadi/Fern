import styles from './amount-button.module.scss';

interface Props {
  value: number;
  disabled?: boolean;
  onIncrease: Function;
  onDecrease: Function;
}

export enum Mode {
  primary = '#24AFFF',
  danger = '#DB0060',
  warning = '#FF9124',
  success = '#009289',
  light = '#AAAAAA',
}

export type AmountButtonProps = Props;

const AmountButton: React.FC<AmountButtonProps> = (props) => {
  return (
    <div className={styles.buttonContainer}>
      <div
        className={styles.btn}
        onClick={() => {
          if (!props.disabled) {
            props.onIncrease();
          }
        }}>
        {'+'}
      </div>
      <div dir="ltr" className={styles.num} style={{ color: props.disabled ? Mode.light : Mode.success }}>
        {props.value}
      </div>
      <div
        className={styles.btn}
        onClick={() => {
          if (!props.disabled) {
            props.onDecrease();
          }
        }}>
        {'-'}
      </div>
    </div>
  );
};

export default AmountButton;
