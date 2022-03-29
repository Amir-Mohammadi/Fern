import { Desc, Icons } from '@Components/icons';
import styles from './review.module.scss';

interface Props {
  review: string;
}

export type ProductReviewProps = Props;
const ProductReview: React.FC<ProductReviewProps> = (props) => {
  return (
    <div className={styles.container}>
      <div
        className={styles.review}
        dangerouslySetInnerHTML={{
          __html: props.review,
        }}></div>
      <div style={{ flex: '1', justifyContent: 'center' }}>
        <Icons icon={Desc} size={218} color={'#D3D3D3'} />
      </div>
    </div>
  );
};

export default ProductReview;
