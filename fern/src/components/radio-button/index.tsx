import styles from './radio-button.module.scss';

export enum Mode {
  primary = '#24AFFF',
  danger = '#DB0060',
  warning = '#FF9124',
  success = '#009289',
  light = '#AAAAAA',
}

interface Props {
  value: boolean;
  text: string;
  mode?: Mode;
  onChange: () => void;
}

export type RadioButtonProps = Props;

const RadioButton: React.FC<RadioButtonProps> = (props) => {
  return (
    <div className={styles.Body}>
      <div className={styles.Container}>
        <input
          className={styles.radioContent}
          checked={props.value}
          type="radio"
          onChange={() => {
            props.onChange();
          }}
        />
        {props.text}
      </div>
    </div>
  );
};

export default RadioButton;
