import { IconGenerator } from '@Components/icons';
import styles from './source.module.scss';

interface Props {
  button: { icon: IconGenerator; url: string }[];
  title: string;
}

export type SocialProps = Props;
const Social: React.FC<SocialProps> = (props) => {
  return (
    <div className={styles.content}>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.items}>
        {props.button.map((item, i) => {
          return (
            <a key={i + 'buttons'} href={item.url}>
              {/* <Icons icon />  */}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Social;
