import styles from './card.module.scss';

interface Props {}

export type AlertProps = Props;

const Card: React.FC<AlertProps> = (props) => {
  return <div className={styles.card}>{props.children}</div>;
};

export default Card;
