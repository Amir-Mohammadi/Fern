import { ChangeEvent } from 'react';
import styles from './check-box.module.scss';

export enum Mode {
  primary = '#24AFFF',
  danger = '#DB0060',
  warning = '#FF9124',
  success = '#009289',
  light = '#AAAAAA',
}

interface Props {
  id: number | string;
  text?: string;
  checked: boolean;
  disabled?: boolean;
  mode?: Mode;
  onChange?: (checked: boolean) => any;
}

export type CheckBoxProps = Props;

const CheckBox: React.FC<CheckBoxProps> = (props) => {
  function handleChecked(event: ChangeEvent<HTMLInputElement>) {
    props.onChange!(event.target.checked);
  }

  return (
    <div className={styles.checkbox}>
      <input
        size={1}
        disabled={props.disabled}
        onChange={handleChecked}
        type="checkbox"
        checked={props.checked}></input>
      <span>{props.text}</span>
    </div>
  );
};

export default CheckBox;
