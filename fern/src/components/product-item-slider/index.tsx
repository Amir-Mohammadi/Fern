import { Mode } from '@Constants/colors';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { useMediaQuery } from 'react-responsive';
import { MoonLoader } from 'react-spinners';
import HeaderSeparator from '../header-separator';
import ProductItem, { ProductItemProps } from '../product-item';
import styles from './product-item-slider.module.scss';

interface Props {
  products: ProductItemProps[];
  mode?: Mode;
  title?: string;
  loading: boolean;

  url?: string;
}

export type ProductItemSliderProps = Props;

const ProductItemSlider: React.FC<ProductItemSliderProps> = (props) => {
  const container = useRef<HTMLInputElement>(null);
  const isSmallDevice = useMediaQuery({
    query: '(max-device-width: 768px)',
  });

  return (
    <div className={styles.container}>
      {/* <div style={{flex: "none",margin:'20px'}}>
            <HeaderSeparator text="پر فروش ترین کالاها" type="round" />
          </div> */}
      <div className={styles.swapper}>
        <div
          className={styles.swipeBtn}
          onClick={() => {
            if (container.current) {
              container.current.scrollLeft = container.current.scrollLeft - 1320;
            }
          }}>
          {!isSmallDevice && <FontAwesomeIcon icon={faChevronRight} color={props.mode || '#FFFFFF'} />}
        </div>
        <div className={styles.scroller} style={{}}>
          <div className={styles.header}>
            <HeaderSeparator text={props.title!} type="round" mode={props.mode} />
          </div>

          <ScrollContainer vertical={false} innerRef={container} className={styles.scrollerContaiter}>
            {props.loading ? (
              <div className={styles.loadingDialog}>
                <MoonLoader color={props.mode || Mode.success} loading={true} size={60} />
              </div>
            ) : (
              <div className={styles.items}>
                {props.products.map((product, i) => (
                  <div
                    key={i + '_ProductItemSlider'}
                    className={styles.productItem}
                    style={{
                      marginRight: i == 0 ? '0' : '8px',
                      marginLeft: 1 + i == props.products.length ? '0' : '8px',
                    }}>
                    <ProductItem
                      hasSellingStock={product.hasSellingStock}
                      discountPrice={product.discountPrice}
                      postTime={product.postTime}
                      discountRate={product.discountRate}
                      offer={product.offer}
                      text={product.text}
                      realPrice={product.realPrice}
                      image={product.image}
                      metaDescription={product.metaDescription}
                      id={product.id}
                    />
                  </div>
                ))}
              </div>
            )}
          </ScrollContainer>

          <span style={{}}>
            <a href={props.url} style={{ color: props.mode || '#FFFFFF' }}>
              مشاهده همه
            </a>
          </span>
        </div>
        <div
          className={styles.swipeBtn}
          onClick={() => {
            if (container.current) {
              container.current.scrollLeft = container.current.scrollLeft + 1320;
            }
          }}>
          {!isSmallDevice && <FontAwesomeIcon icon={faChevronLeft} color={props.mode || '#FFFFFF'} />}
        </div>
      </div>
    </div>
  );
};

export default ProductItemSlider;
