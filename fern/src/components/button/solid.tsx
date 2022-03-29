import { Mode } from '@Constants/colors';
import React from 'react';
import { IconGenerator, Icons } from '../icons';
import styles from './button.module.scss';
import Button from './index';

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

const solid: React.FC<ButtonProps> = (props) => {
  return (
    <Button.Basic
      buttonClassName={styles.solid}
      style={{
        color: props.disabled ? Mode.light : props.mode,
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

export default solid;
