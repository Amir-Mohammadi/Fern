import { Mode } from '@Constants/colors';
import Button from '../button';
import styles from './button-group.module.scss';

interface Props {
  buttons: { text: string; onClick: Function; tooltip?: string; mode?: Mode }[];
  defaultMode: Mode;
}

export type buttonGroupProps = Props;

const ButtonGroup: React.FC<buttonGroupProps> = (props) => {
  return (
    <div className={styles.container}>
      {props.buttons.map((target, index) => (
        <div className={styles.button} style={{ color: props.defaultMode || Mode.light }}>
          <Button.Solid
            text={target.text}
            onClick={target.onClick}
            mode={target.mode || props.defaultMode || Mode.light}
          />

          {++index == props.buttons.length ? null : '|'}
        </div>
      ))}
    </div>
  );
};

export default ButtonGroup;
