import Button from '@Components/button';
import styles from './hello-world.module.scss';
type Props = {
  text: string;
  onButtonClicked: Function;
};

const HelloWorld: React.FC<Props> = (props) => {
  return (
    <div>
      <div className={styles.HelloWorld}>{props.text}</div>
      <Button.Basic
        text={'Button'}
        onClick={() => {
          props.onButtonClicked();
        }}
      />
    </div>
  );
};

export default HelloWorld;
// this file created just for example
