import { Mode } from '@Constants/colors';
import classNames from 'classnames';
import styles from './alert.module.scss';

interface Props {
  text: string;
  mode?: Mode;
}

export type AlertProps = Props;

const Alert: React.FC<AlertProps> = (props) => {
  return (
    <div
      className={classNames({
        [styles.alert]: true,
        [styles.gPrimary]: props.mode === Mode.primary,
        [styles.gDanger]: props.mode === Mode.danger,
        [styles.gSuccess]: props.mode === Mode.success,
        [styles.gWarning]: props.mode === Mode.warning,
      })}>
      <span>{props.text}</span>
    </div>
  );
};

export default Alert;
