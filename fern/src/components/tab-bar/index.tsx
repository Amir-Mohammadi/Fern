import { IconGenerator, Icons } from '@Components/icons';
import { Mode } from '@Constants/colors';
import classNames from 'classnames';
import React from 'react';
import Badge, { Shapes } from '../badge';
import styles from './tab-bar.module.scss';

export enum TabBarTypes {
  CheckoutTimeTable,
  OrderTabes,
  ProductTabs,
}

export interface TabBarTabContent {
  title: string;
  icon?: IconGenerator;
  countBadge?: number;
  content?: React.ReactElement<any>;
}
interface Props {
  items: TabBarTabContent[];
  selectedIndex: number;
  content?: React.ReactElement<any>;
  setSelectedIndex: (index: number) => any;
  styleType: TabBarTypes;
}

export type TabBarProps = Props;

function isSelected(index: number, props: Props) {
  return index === props.selectedIndex;
}

function isType(type: TabBarTypes, props: Props) {
  return type === props.styleType;
}

function generateTabClassNames(index: number, props: Props) {
  return {
    [styles.tab]: true,
    [styles.selectedTab]: isSelected(index, props),
    [styles.orderTabesTab]: isType(TabBarTypes.OrderTabes, props),
    [styles.checkoutTimeTableTab]: isType(TabBarTypes.CheckoutTimeTable, props),
  };
}

function generateTabBarClassNames(props: Props) {
  return {
    [styles.tabBar]: true,
    [styles.orderTabesTabBar]: isType(TabBarTypes.OrderTabes, props),
    [styles.checkoutTimeTableTabBar]: isType(TabBarTypes.CheckoutTimeTable, props),
  };
}

function generateItemsContainerClassNames(props: Props) {
  return {
    [styles.itemsContainer]: isType(TabBarTypes.ProductTabs, props),
    [styles.orderTabesItemsContainer]: isType(TabBarTypes.OrderTabes, props),
    [styles.checkoutTimeTableItemsContainer]: isType(TabBarTypes.CheckoutTimeTable, props),
  };
}

function renderTabs(props: Props) {
  return props.items.map((value, index) => {
    return (
      <li
        onClick={() => {
          props.setSelectedIndex(index);
        }}
        className={classNames(generateTabClassNames(index, props))}
        key={index + '_tabBar'}>
        <div className={styles.tabBarText}>
          <span className={styles.tabIcon}>
            {value.icon === undefined ? null : <Icons size={20} icon={value.icon} color="#707070" />}
          </span>
          <span style={{ padding: '0 6px' }}>{value.title}</span>
          {value.countBadge === undefined ? null : (
            <Badge mode={Mode.danger} shape={Shapes.Square} value={value.countBadge} />
          )}
        </div>
      </li>
    );
  });
}

const TabBar: React.FC<TabBarProps> = (props) => {
  return (
    <div className={styles.container}>
      <ul className={classNames(generateTabBarClassNames(props))}>
        <div className={classNames(generateItemsContainerClassNames(props))}>{renderTabs(props)}</div>
      </ul>
      <div className={styles.tabContent}>{props.items[props.selectedIndex]?.content || props.content}</div>
    </div>
  );
};

export default TabBar;
