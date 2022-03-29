import HeaderSeparator from '@Components/header-separator';
import { Mode } from '@Constants/colors';
import { MoonLoader } from 'react-spinners';
import styles from './brands-list.module.scss';

interface Props {
  list: BrandListProps[];
  loading?: boolean;
}

export interface BrandListProps {
  imageUrl: string;
  target_url?: string;
  alt?: string;
}

export type BrandsListProps = Props;

const BrandsList: React.FC<BrandsListProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.brandHD}>
        <HeaderSeparator text="برندها" type="round" />
      </div>
      {props.loading ? (
        <div className={styles.loadingDialog}>
          <MoonLoader color={Mode.success} loading={true} size={60} />
        </div>
      ) : (
        <div className={styles.brandBD}>
          {props.list.map((brand, i) => (
            <div key={i + 'brandsList'} className={styles.brand}>
              <img style={{ objectFit: 'contain' }} src={brand.imageUrl} alt={brand.alt} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrandsList;
