import { Filter, Icons } from '@Components/icons';
import { ISortBy } from '@Stores';
import classNames from 'classnames';
import styles from './sort-option.module.scss';

export enum Mode {
  primary = '#24AFFF',
  danger = '#DB0060',
  warning = '#FF9124',
  success = '#009289',
  light = '#AAAAAA',
}

interface Props {
  option: string[];
  onChange?: (param: number) => void;
  selectedIndex: ISortBy | undefined;
}

export type SortOptionProps = Props;

const SortOption: React.FC<SortOptionProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <Icons icon={Filter} size={16} />
      </div>
      <ul className={styles.options}>
        {props.option.map((option, i) => (
          <li
            key={i + 'option'}
            className={classNames({ [styles.selected]: i === props.selectedIndex })}
            onClick={() => {
              props.onChange!(i);
            }}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SortOption;
