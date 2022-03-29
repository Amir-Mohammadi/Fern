import { useRouter } from 'next/router';
import styles from './bread-crump.module.scss';
interface Props {
  url: string;
  text: string;
}

export type BreadCrumpProps = Props;

const BreadCrump: React.FC<BreadCrumpProps> = (props) => {
  const router = useRouter();
  return (
    <div className={styles.content}>
      <span
        onClick={() => {
          router.push({
            pathname: props.url,
          });
        }}>
        فروشگاه اینترنتی السل<span>•</span>
        <span>{props.text}</span>
      </span>
    </div>
  );
};

export default BreadCrump;
