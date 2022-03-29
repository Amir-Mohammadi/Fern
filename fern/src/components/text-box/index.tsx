import { IconGenerator, Icons } from '@Components/icons';
import styles from './text-box.module.scss';

export enum Mode {
  primary = '#24AFFF',
  danger = '#DB0060',
  warning = '#FF9124',
  success = '#009289',
  light = '#AAAAAA',
}

interface Props {
  value?: string;
  placeHolder?: string;
  icon: IconGenerator;
  toolTip?: string;
  disabled?: boolean;
  mode: Mode;

  onChange: (event: any) => void;
}

export type TextBoxProps = Props;

const TextBox: React.FC<TextBoxProps> = (props) => {
  return (
    <div className={styles.container}>
      <form>
        <label>
          <div className={styles.light}>
            <Icons
              icon={props.icon}
              size={25}
              color={props.mode || Mode.light}
              secondColor={props.mode || Mode.light}
            />

            <input
              onChange={(e) => props.onChange(e.target.value)}
              type="textbox"
              placeholder={props.placeHolder}
              value={props.value}
              disabled={props.disabled}
              color={Mode.success}
              {...props.icon}
            />
          </div>
        </label>
      </form>
    </div>
  );
};

export default TextBox;
