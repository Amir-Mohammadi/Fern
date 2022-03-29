import { IconGenerator, Icons } from '@Components/icons';
import classNames from 'classnames';
import React from 'react';
import styles from './nav-item.module.scss';

export enum Mode {
  primary = '#24AFFF',
  danger = '#DB0060',
  warning = '#FF9124',
  success = '#009289',
  light = '#AAAAAA',
}

interface Props {
  selected: boolean;
  icon: IconGenerator;
  text: string;
  onClick: () => void;
}

export type NavItemProps = Props;

const NavItem: React.FC<NavItemProps> = (props) => {
  return (
    <div
      className={classNames({
        [styles.container]: true,
        [styles.selected]: props.selected,
      })}
      onClick={props.onClick}>
      <div className={styles.iconBX}>
        <Icons
          icon={props.icon}
          size={15}
          color={props.selected ? Mode.success : Mode.light}
          secondColor={Mode.light}
        />
      </div>
      <div
        className={classNames({
          [styles.titleBX]: true,
          [styles.selected]: props.selected,
        })}>
        {props.text}
      </div>
    </div>
  );
};

export default NavItem;
