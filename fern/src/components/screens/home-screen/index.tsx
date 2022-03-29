import BrandsList, { BrandsListProps } from '@Components/brands-list';
import ProductItemSlider, { ProductItemSliderProps } from '@Components/product-item-slider';
import Slider, { SliderProps } from '@Components/slider';
import SupportTag from '@Components/support-tag';
import { PRODUCT_CATEGORY_ID } from '@Config';
import { Mode } from '@Constants/colors';
import { urlService } from '@Services/url';
import { IProductsSearchParameters, ISortBy } from '@Stores/search-page-store';
import { Position } from '@Utils/position-types';
import classnames from 'classnames';
import { useEffect } from 'react';
import styles from './home.module.scss';

interface Props {
  bestSellerProductList: ProductItemSliderProps;
  fridgeAndFreezerProductList: ProductItemSliderProps;
  coolingProductList: ProductItemSliderProps;
  offeredProductList: ProductItemSliderProps;
  popularProductList: ProductItemSliderProps;
  sliderContent: SliderProps;
  brandsList: BrandsListProps;
  onHomeStoreDidMount: () => void;
}

export enum Target {
  FORM_LOAD = 'home-screen-form-load',
  SLIDER_LOAD = 'home-screen-slider-load',
  BEST_SELLING_LOAD = 'home-screen-best-selling-load',
  POPULAR_LOAD = 'home-screen-popular-load',
  BRANDS_LOAD = 'home-screen-brands-load',
  LOAD_BY_CATEGORY = 'home-screen-load-by-category',
}

export type HomeProps = Props;

const generateSearchUrl = (options: IProductsSearchParameters): string => {
  return urlService.searchUrlService.createSearchUrl(options);
};

const Home: React.FC<HomeProps> = (props) => {
  useEffect(() => {
    props.onHomeStoreDidMount();
    return () => {};
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.sliderBar}>
          <div className={styles.slider}>
            <Slider {...props.sliderContent} buttonPosition={Position.none} />
          </div>
        </div>
        {props.bestSellerProductList.products.length > 0 && (
          <div className={classnames({ [styles.row]: true, [styles.gDanger]: true })}>
            <div className={styles.safeArea}>
              <ProductItemSlider
                {...props.bestSellerProductList}
                title="پر فروش ترین کالاها"
                url={generateSearchUrl({ sortBy: ISortBy.BESTSELLING })}
              />
            </div>
          </div>
        )}
        {props.fridgeAndFreezerProductList.products.length > 0 && (
          <div className={classnames({ [styles.row]: true })}>
            <div className={styles.safeArea}>
              <ProductItemSlider
                {...props.fridgeAndFreezerProductList}
                title="یخچال و فریزر"
                mode={Mode.light}
                url={generateSearchUrl({ categoryId: PRODUCT_CATEGORY_ID.FRIDGE_FREEZER })}
              />
            </div>
          </div>
        )}
        {props.coolingProductList.products.length > 0 && (
          <div className={classnames({ [styles.row]: true })}>
            <div className={styles.safeArea}>
              <ProductItemSlider
                {...props.coolingProductList}
                title="لوازم سرمایشی"
                mode={Mode.light}
                url={generateSearchUrl({ categoryId: PRODUCT_CATEGORY_ID.COOLING })}
              />
            </div>
          </div>
        )}
        {props.brandsList.list.length > 0 && (
          <div className={classnames({ [styles.row]: true, [styles.gPrimary]: true })}>
            <div className={styles.safeArea}>
              <BrandsList {...props.brandsList} />
            </div>
          </div>
        )}
        {props.popularProductList.products.length > 0 && (
          <div className={classnames({ [styles.row]: true })}>
            <div className={styles.safeArea}>
              <ProductItemSlider
                {...props.popularProductList}
                title="محبوب ترین ها"
                mode={Mode.light}
                url={generateSearchUrl({ sortBy: ISortBy.POPULAR })}
              />
            </div>
          </div>
        )}
        {props.offeredProductList.products.length > 0 && (
          <div className={classnames({ [styles.row]: true, [styles.gDanger]: true })}>
            <div className={styles.safeArea}>
              <ProductItemSlider
                {...props.offeredProductList}
                title="تخفیف دار ها"
                url={generateSearchUrl({ discounted: true })}
              />
            </div>
          </div>
        )}
      </div>
      <div className={styles.footerContainer}>
        <div className={styles.support}>
          <SupportTag />
        </div>
      </div>
    </div>
  );
};

export default Home;
