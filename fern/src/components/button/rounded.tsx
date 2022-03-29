import { Icons } from '@Components/icons';
import { Gradient, Gradients } from '@Constants/colors';
import classNames from 'classnames';
import Button from '.';
import { IconGenerator } from '../icons';
import styles from './button.module.scss';

interface Props {
  text: string;
  icon?: IconGenerator;
  tooltip?: string;
  disabled?: boolean;
  mode?: Gradient;
  onClick?: Function;
  buttonClassName?: string;
  reverse?: boolean;
  gradiant?: boolean;
  href?: string;
}

export type ButtonProps = Props;

const rounded: React.FC<ButtonProps> = (props) => {
  const colorSelector = () => {
    let color;
    if (props.disabled) {
      color = Gradients.light.baseColor;
    } else {
      if (props.gradiant) {
        color = `linear-gradient(` + props.mode?.baseColor + ',' + props.mode?.secondColor + ')';
      } else {
        color = props.mode?.baseColor;
      }
    }
    return color;
  };
  return (
    <Button.Basic
      buttonClassName={classNames({
        [styles.rounded]: true,
        [props.buttonClassName!]: props.buttonClassName !== undefined,
      })}
      style={{
        backgroundColor: props.disabled ? Gradients.light.baseColor : 'red',
        background: colorSelector(),
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

export default rounded;
