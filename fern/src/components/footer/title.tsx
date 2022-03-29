import styles from './source.module.scss';

interface Props {
  items: { title: string; url: string }[];
  title: string;
}

export type TitleProps = Props;
const Title: React.FC<TitleProps> = (props) => {
  return (
    <div className={styles.content}>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.items}>
        {props.items.map((item, i) => {
          return (
            <a key={i + 'items'} href={item.url}>
              {item.title}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Title;
