import { Mode } from '@Constants/colors';
import classNames from 'classnames';
import React from 'react';
import styles from './badge.module.scss';

export enum Shapes {
  Circle,
  Square,
}
interface Props {
  value: string | number;
  shape: Shapes;
  mode: Mode;
  max?: number;
}

export type BadgeProps = Props;

function isNumeric(str: string) {
  if (typeof str != 'string') return false;
  return !isNaN(parseInt(str)) && !isNaN(parseFloat(str));
}

function renderValue(input: BadgeProps) {
  if (typeof input.value == 'string' && isNumeric(input.value)) {
    let inputInt = parseInt(input.value);
    let max = input.max ?? 99;

    if (inputInt > max) {
      return max + '+';
    } else {
      return input.value;
    }
  } else {
    return input.value;
  }
}

function renderMode(input: BadgeProps) {
  switch (input.mode) {
    case Mode.primary:
      return '#24AFFF';

    case Mode.danger:
      return '#DB0060';

    case Mode.warning:
      return '#FF9124';

    case Mode.success:
      return '#009289';

    case Mode.light:
      return '#AAAAAA';
  }
}

const Badge: React.FC<BadgeProps> = ({ ...props }) => {
  return (
    <div
      style={{ backgroundColor: renderMode(props) }}
      className={classNames({
        [styles.shape]: true,
        [styles.square]: props.shape === Shapes.Square,
        [styles.circle]: props.shape === Shapes.Circle,
      })}>
      <div className={styles.TextDiv}>{renderValue(props)}</div>
    </div>
  );
};

export default Badge;
