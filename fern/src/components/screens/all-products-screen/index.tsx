import BreadCrump from '@Components/bread-crumb';
import CheckBoxFilter, { CheckBoxFilterProps } from '@Components/checkbox-filter';
import Filter, { EspFilterProps } from '@Components/esp-filters';
import { ProductItemProps } from '@Components/product-item';
import ProductsList from '@Components/products-list';
import RangeSlider, { RangeSliderProps } from '@Components/range-slider';
import SortOption, { SortOptionProps } from '@Components/sort-option';
import SupportTag from '@Components/support-tag';
import { useEffect } from 'react';
import styles from './all-products.module.scss';

export enum Targets {
  LOAD_FILTERS = 'search-screen-load-filters',
  TOGGLE_ESP_OPTIONS = 'search-screen-toggle-esp-options',
  TOGGLE_BRANDS_FILTER = 'search-screen-toggle-brands-filter',
  ON_CHANGE_RANGE_SLIDER_VALUE = 'search-screen-on-change-range-slider-value',
  APPLY_PRICE_FILTER = 'search-screen-apply-price-filter',
  CHANGE_SORT_OPTION = 'search-screen-change-sort-option',
}

interface Props {
  products: ProductItemProps[];
  brandsFilter: CheckBoxFilterProps;
  priceRange: RangeSliderProps;
  espFilters: EspFilterProps[];
  sortOption: SortOptionProps;
  action: (target: Targets, value?: any) => void;
}

export type AllProductsProps = Props;

const AllProducts: React.FC<AllProductsProps> = (props) => {
  useEffect(() => {
    props.action(Targets.LOAD_FILTERS);
    return () => {};
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.filterBX}>
          <CheckBoxFilter
            {...props.brandsFilter}
            action={(brandId) => props.action(Targets.TOGGLE_BRANDS_FILTER, brandId)}
          />
          {props.espFilters!.map((filter: EspFilterProps, i: number) => (
            <Filter
              key={i + 'filters'}
              {...filter}
              action={(option) => props.action(Targets.TOGGLE_ESP_OPTIONS, option)}
            />
          ))}
          <RangeSlider
            {...props.priceRange}
            header={'محدوده قیمت'}
            onChange={(value) => {
              props.action(Targets.ON_CHANGE_RANGE_SLIDER_VALUE, value);
            }}
            onApply={() => props.action(Targets.APPLY_PRICE_FILTER)}
          />
        </div>
        <div className={styles.productsBX}>
          <div className={styles.sortOptionBX}>
            <SortOption
              {...props.sortOption}
              onChange={(sortOption) => {
                props.action(Targets.CHANGE_SORT_OPTION, sortOption);
              }}
            />
          </div>
          <div className={styles.breadCrumbBX}>
            <BreadCrump text={'فروشگاه السل'} url={''} />
          </div>
          <ProductsList products={props.products} />
        </div>
      </div>
      <div className={styles.footerContainer}>
        <div className={styles.support}>
          <SupportTag />
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
