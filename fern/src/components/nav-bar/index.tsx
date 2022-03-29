import DropDown from '@Components/dropdown';
import { IconGenerator } from '@Components/icons';
import classNames from 'classnames';
import Avatar from '../avatar';
import NavItem from '../nav-item';
import styles from './nav-bar.module.scss';

interface Props {
  name: string;
  items: { text: string; icon: IconGenerator }[];
  onClick: (e: number) => void;
  selected: number;
}

export type NavBarProps = Props;

const NavBar: React.FC<NavBarProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Avatar />
        <div className={styles.headBX}>
          <span>{props.name}</span>
          <div className={styles.navChartDropdown}>
            <DropDown
              option={navItemsToDropdown(props.items)}
              onSelect={(i) => props.onClick(i)}
              selectedIndex={[props.selected]}
            />
          </div>
        </div>
      </div>

      <div className={styles.navChart}>
        {props.items.map((target, i) => (
          <div
            className={classNames({
              [styles.navItem]: true,
            })}>
            <NavItem
              text={target.text}
              icon={target.icon}
              selected={i == props.selected}
              onClick={() => props.onClick(i)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavBar;

const navItemsToDropdown = (navItems: Array<{ text: string; icon: IconGenerator }>) => {
  const dropdownList: Array<{ title: string }> = [];

  navItems.forEach((item) => {
    dropdownList.push({ title: item.text });
  });

  return dropdownList;
};
