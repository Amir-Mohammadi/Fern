import { IProductColor } from '@Interfaces/common';
import { urlService } from '@Services/url';
import styles from './brief-product.module.scss';

export enum Mode {
  primary = '#24AFFF',
  danger = '#DB0060',
  warning = '#FF9124',
  success = '#009289',
  light = '#AAAAAA',
}

interface Props {
  product: {
    id: number;
    title?: string;
    brand?: string;
    color?: string;
    metaDescription: string;
    productColor?: IProductColor | null;
    image?: string;
  };
  onClick?: () => {};
}
export type BriefProductProps = Props;
const generateBriefProductUrl = (productId: number, metaDescription: string): string => {
  return urlService.productUrlService.createProductUrl(productId ?? 0, metaDescription);
};
const BriefProduct: React.FC<BriefProductProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <a
          href={generateBriefProductUrl(props.product.id, props.product.metaDescription)}
          className={styles.imageSelection}>
          <img src={props.product.image} className={styles.image} alt="" />
        </a>
      </div>
      <div className={styles.cartTags}>
        <div>
          <a href={generateBriefProductUrl(props.product.id, props.product.metaDescription)}>{props.product.title}</a>
        </div>
        <div>{props.product.brand}</div>
        <div>
          {props.product?.productColor?.color?.name ?? props.product?.color}{' '}
          <div className={styles.circle} style={{ backgroundColor: props.product?.productColor?.color?.HexCode }}></div>
        </div>
      </div>
    </div>
  );
};

export default BriefProduct;
