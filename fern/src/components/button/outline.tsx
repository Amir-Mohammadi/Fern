import { IconGenerator, Icons } from '@Components/icons';
import { Mode } from '@Constants/colors';
import Button from '.';
import styles from './button.module.scss';

interface Props {
  text: string;
  icon?: IconGenerator;
  tooltip?: string;
  disabled?: boolean;
  mode?: Mode;
  onClick?: Function;
  reverse?: boolean;
  href?: string;
}

export type ButtonProps = Props;

const outline: React.FC<ButtonProps> = (props) => {
  return (
    <Button.Basic
      buttonClassName={styles.outline}
      style={{
        color: props.disabled ? Mode.light : props.mode,
        borderColor: props.disabled ? Mode.light : props.mode,
        flexDirection: props.reverse ? 'row-reverse' : 'row',
      }}
      onClick={() => {
        props.onClick ? props.onClick() : null;
      }}
      href={props.href}
      disabled={props.disabled}>
      {props.icon ? (
        <span>
          <Icons icon={props.icon} color="#FFFFFF" size={20} />
        </span>
      ) : null}
      <span>{props.text}</span>
    </Button.Basic>
  );
};

export default outline;
