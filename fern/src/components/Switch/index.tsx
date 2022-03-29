import classNames from 'classnames';
import styles from './switch.module.scss';

export enum Mode {
  primary = '#24AFFF',
  danger = '#DB0060',
  warning = '#FF9124',
  success = '#009289',
  light = '#AAAAAA',
}

interface Props {
  text?: string;
  value: boolean;
  disabled?: boolean;
  mode?: Mode;
  onChange: (event: any) => void;
}

export type SwitchProps = Props;

const Switch: React.FC<SwitchProps> = (props) => {
  return (
    <div className={styles.container}>
      <label className={styles.switch}>
        <input
          className={styles.inputs}
          type="checkbox"
          checked={props.value}
          onChange={(e) => {
            props.onChange(e.target.checked);
          }}
        />
        <span
          className={classNames({
            [styles.slider]: true,
            [styles.slider2]: true,
            [styles.round]: true,
            [styles.sliderSuccess]: props.mode == Mode.success,
            [styles.sliderDanger]: props.mode == Mode.danger,
            [styles.sliderPrimary]: props.mode == Mode.primary,
            [styles.sliderWarning]: props.mode == Mode.warning,
            [styles.sliderlight]: props.mode == Mode.light,
          })}></span>
      </label>
    </div>
  );
};

export default Switch;
