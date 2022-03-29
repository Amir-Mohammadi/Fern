import { Filter as FilterIcon, Icons } from '@Components/icons';
import CheckBox, { CheckBoxProps } from '../check-box';
import styles from './esp-filters.module.scss';

interface Props {
  propertyId?: number;
  header?: string;
  options: Array<CheckBoxProps>;
  action?: (option: { propertyId: number; key: number | string }) => void;
}

export type EspFilterProps = Props;

const EspFilter: React.FC<EspFilterProps> = (props) => {
  return (
    <div className={styles.container}>
      {props.header ? (
        <div className={styles.cardHeader}>
          <Icons icon={FilterIcon} color="#707070" size={16} />
          <span>&nbsp;{props.header}</span>
        </div>
      ) : null}

      <div className={styles.cardContent}>
        <div className={styles.checksBX}>
          {props.options.map((option, i) => (
            <CheckBox
              key={i}
              {...option}
              onChange={() => props.action!({ propertyId: props.propertyId!, key: option.id })}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EspFilter;
