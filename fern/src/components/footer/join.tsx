import styles from './source.module.scss';

interface Props {
  button: { title: string; onClick: () => any }[];
  title: string;
}

export type JoinProps = Props;
const Join: React.FC<JoinProps> = (props) => {
  return (
    <div className={styles.content}>
      <div className={styles.joinTitle}>{props.title}</div>
      <div className={styles.items}>
        {props.button.map((item, i) => {
          return (
            <div key={i + 'buttons'} className={styles.button}>
              {item.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Join;
