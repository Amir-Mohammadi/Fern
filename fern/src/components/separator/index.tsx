import { Mode } from '@Constants/colors';
import styles from './separator.module.scss';

interface Props {
  lineStyle?: 'solid' | 'dashed' | 'dotted';
  mode?: Mode;
}

export type SeparatorProps = Props;

const Separator: React.FC<SeparatorProps> = (props) => {
  return (
    <div
      className={styles.lineSeparator}
      style={{
        borderTopColor: props.mode || Mode.light,
        borderTopStyle: props.lineStyle || 'solid',
      }}></div>
  );
};

export default Separator;
