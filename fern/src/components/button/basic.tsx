import { IconGenerator, Icons } from '@Components/icons';
import { Mode } from '@Constants/colors';
import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';
import { CSSProperties } from 'styled-components';
import styles from './button.module.scss';

interface Props {
  text?: string;
  icon?: IconGenerator;
  tooltip?: string;
  disabled?: boolean;
  mode?: Mode;
  onClick?: Function;
  reverse?: boolean;
  buttonClassName?: string;
  href?: string;
  style?: CSSProperties;
}

export type BasicButton = Props;

const Basic: React.FC<BasicButton> = (props) => {
  return (
    <>
      {props.href ? (
        <a href={props.href} className={styles.imageHref}>
          {basicButton(props)}
        </a>
      ) : (
        <>{basicButton(props)}</>
      )}
    </>
  );
};

export default Basic;

const basicButton = (props: PropsWithChildren<Props>) => {
  return (
    <button
      className={classNames({
        [props.buttonClassName!]: props.buttonClassName !== undefined,
      })}
      style={
        props.style
          ? props.style
          : {
              backgroundColor: props.disabled ? Mode.light : props.mode,
              flexDirection: props.reverse ? 'row-reverse' : 'row',
            }
      }
      onClick={
        props.href
          ? () => {}
          : () => {
              props.onClick ? props.onClick() : null;
            }
      }
      disabled={props.disabled}>
      {props.children ? (
        props.children
      ) : (
        <div className={styles.imageHref}>
          {props.icon ? (
            <span>
              <Icons icon={props.icon} color="#FFFFFF" size={20} />
            </span>
          ) : null}
          <span>{props.text}</span>
        </div>
      )}
    </button>
  );
};
