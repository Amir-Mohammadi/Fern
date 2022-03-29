import CheckBox, { CheckBoxProps } from '@Components/check-box';
import { Filter as FilterIcon, Icons } from '@Components/icons';
import React from 'react';
import styles from './checkbox-filter.module.scss';

interface props {
  header: string;
  options: Array<CheckBoxProps>;
  action?: (optionId: string | number) => void;
}

export type CheckBoxFilterProps = props;

const CheckBoxFilter: React.FC<CheckBoxFilterProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.cardHeader}>
        <Icons icon={FilterIcon} color="#707070" size={16} />
        <span>&nbsp;{props.header}</span>
      </div>

      <div className={styles.cardContent}>
        <div className={styles.checksBX}>
          {props.options.map((option, i) => (
            <CheckBox key={i} {...option} onChange={() => props.action!(option.id)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheckBoxFilter;
