//#region imports
import { CheckBoxFilterProps } from '@Components/checkbox-filter';
import { EspFilterProps } from '@Components/esp-filters';
import { ICategoryTree } from '@Components/header';
import { ProductItemProps } from '@Components/product-item';
import { RangeSliderProps } from '@Components/range-slider';
import { Targets } from '@Components/screens/all-products-screen';
import { TreeViewNodes } from '@Components/tree-view';
import { IMarketBrand } from '@Interfaces/common';
import { OrderModel, SortByModel } from '@Services';
import SearchService from '@Services/search.service';
import { espQueryBuilder } from '@Utils/queryBuilder';
import { transformSortByInterface } from '@Utils/sort-option-adapter';
import { action, makeObservable, observable } from 'mobx';

//#endregion

//#region enums
export enum ISortBy {
  MOST_EXPENSIVE,
  CHEAPEST,
  MOST_VISITED,
  POPULAR,
  BESTSELLING,
  OFFERED,
  PRICE,
  NONE,
}
//#endregion

export class SearchStore {
  private searchService: SearchService;
  setSearchQuery: ((query: string) => void) | undefined;

  public constructor() {
    makeObservable(this);

    this.searchService = new SearchService();
  }

  private _categoryId: number = -1;
  private checkedOptions: Array<number | string> = [];
  private espQueryString: Array<{ key: number | string; values: Array<number | string> }> = [];
  private params = new URLSearchParams();
  private sortBy: [SortByModel | undefined, OrderModel | undefined] = [undefined, undefined];

  @observable treeViewNodes: Array<TreeViewNodes> = [];
  @observable hasSellingStock: boolean = true;
  @observable discounted: boolean = true;
  @observable minPrice: number = 0;
  @observable maxPrice: number = 1;
  @observable selectedSortOption: ISortBy = ISortBy.NONE;
  @observable productList: Array<ProductItemProps> = [];
  @observable brandsFilter: CheckBoxFilterProps = { header: 'برندها', options: [] };

  @observable espFilters: Array<EspFilterProps> = [];
  @observable pricesRange: RangeSliderProps = { marks: [], min: 0, max: 0, value: [0, 0] };

  /**----------------------------------------------------------------------------------------------- */

  private loadFilterableValues = async () => {
    this.params.append('categories', this._categoryId.toString());
    try {
      const filters = await this.searchService.getFilterableProperties(this._categoryId!);

      this.espFilters = await this.getFilterValues(filters);
      this.loadCategoryBrands();
      this.loadCategoryPrices();
    } catch (error) {}
  };

  private loadCategoryBrands = async () => {
    const temp = { ...this.brandsFilter };
    try {
      temp.options = await this.searchService.getCategoryBrands(this._categoryId);
      this.brandsFilter = temp;
    } catch (error) {}
  };

  private onChangeRangeSliderValue = (value: Array<number>) => {
    const temp = { ...this.pricesRange };
    temp.value = value;
    this.pricesRange = temp;
  };

  private loadCategoryPrices = async () => {
    const temp = { ...this.pricesRange };
    try {
      const res = await this.searchService.getCategoryPrices(this._categoryId);
      temp.marks = res;
      console.log(temp.marks);

      temp.min = temp.marks[0].value;
      temp.max = temp.marks[temp.marks.length - 1].value;
      temp.value = [temp.min, temp.max];
      this.pricesRange = temp;
    } catch (error) {}
  };

  private applyPriceRange = async () => {
    this.params.delete('min_price');
    this.params.delete('max_price');
    this.params.append('min_price', this.pricesRange.value[0].toString());
    this.params.append('max_price', this.pricesRange.value[1].toString());

    try {
      const espParam = espQueryBuilder(this.espQueryString);
      this.productList = await this.searchService.getProducts(this.params, espParam);
    } catch (error) {}
  };

  private async toggleEspOptions(options: { propertyId: number; key: number | string }) {
    console.log(options);

    const temp = [...this.espFilters];

    this.queryBuilder(options.propertyId, options.key);
    if (this.checkedOptions.includes(options.key)) {
      this.checkedOptions = this.checkedOptions.filter((o) => o !== options.key);
    } else {
      this.checkedOptions.push(options.key);
    }

    temp.forEach((filter) => {
      if (Array.isArray(filter.options)) {
        filter.options.forEach((option) => {
          if (this.checkedOptions.includes(option.id)) {
            option.checked = true;
          } else {
            option.checked = false;
          }
        });
      }
    });

    const espParam = espQueryBuilder(this.espQueryString);
    this.productList = await this.searchService.getProducts(this.params, espParam);
    this.espFilters = temp;
  }

  private applyBrandFilter = async (brandId: number) => {
    const temp = { ...this.brandsFilter };
    const optionIndex = temp.options.findIndex((option) => option.id == brandId);

    temp.options[optionIndex].checked = !temp.options[optionIndex].checked;

    this.params.delete('brands');
    temp.options.forEach((brand) => {
      if (brand.checked) {
        this.params.append('brands', brand.id.toString());
      }
    });

    this.brandsFilter = temp;
    const espParam = espQueryBuilder(this.espQueryString);
    this.productList = await this.searchService.getProducts(this.params, espParam);
  };

  private queryBuilder(propertyId: number | string, key: number | string) {
    var keyIndex = this.espQueryString.findIndex((filter) => filter.key == propertyId);
    if (keyIndex > -1) {
      var valueIndex = this.espQueryString[keyIndex].values.indexOf(key);
      if (valueIndex > -1) {
        this.espQueryString[keyIndex].values.splice(valueIndex, 1);
        if (this.espQueryString[keyIndex].values.length == 0) {
          this.espQueryString.splice(keyIndex, 1);
        }
      } else {
        this.espQueryString[keyIndex].values.push(key);
      }
    } else {
      this.espQueryString.push({ key: propertyId, values: [key] });
    }
  }

  private getFilterValues = async (filters: EspFilterProps[]): Promise<EspFilterProps[]> => {
    for (const filter of filters) {
      filter.options = await this.searchService.getFiltrablePropertiesValues(filter.propertyId!, this._categoryId!);
    }

    return filters;
  };

  private async setSortBy(sortBy: ISortBy) {
    this.selectedSortOption = sortBy;
    this.sortBy = transformSortByInterface(sortBy);

    this.params.delete('sort_by');
    this.params.delete('order');
    if (this.sortBy[0]) {
      this.params.append('sort_by', this.sortBy[0].toString());
    }
    if (this.sortBy[1]) {
      this.params.append('order', this.sortBy[1].toString());
    }

    try {
      const espParam = espQueryBuilder(this.espQueryString);
      this.productList = await this.searchService.getProducts(this.params, espParam);
    } catch (error) {}
  }

  @action handleActions = (target: Targets, value?: any) => {
    switch (target) {
      case Targets.LOAD_FILTERS:
        this.loadFilterableValues();
        break;
      case Targets.TOGGLE_ESP_OPTIONS:
        this.toggleEspOptions(value);
        break;
      case Targets.TOGGLE_BRANDS_FILTER:
        this.applyBrandFilter(value);
        break;
      case Targets.ON_CHANGE_RANGE_SLIDER_VALUE:
        this.onChangeRangeSliderValue(value);
        break;
      case Targets.APPLY_PRICE_FILTER:
        this.applyPriceRange();
        break;
      case Targets.CHANGE_SORT_OPTION:
        this.setSortBy(value);
        break;
      default:
        break;
    }
  };

  /**----------------------------------------------------------------------------------------------- */

  //#region Hydrate
  @action
  public hydrate(initialState?: SearchStoreHydrateProps) {
    if (initialState === undefined) return;

    this._categoryId = initialState.categoryId ?? -1;
    this._hydrateProducts(initialState.products);
    //  this._hydrateCategoryTree(initialState.productCategory);
  }

  // private _hydrateCategoryTree(categoryTree: ICategoryTree[]) {
  //   this.treeViewNodes = searchStoreService.prepareTreeViewNodes(categoryTree);
  // }

  private _hydrateProducts(products: Array<ProductItemProps>) {
    this.productList = products.map((product) => {
      if (!product.image) {
        product.image = { src: '/images/no_image_available.png' };
      }
      return product;
    });
  }
  //#endregion
}

//#region types
export interface InjectedSearchStore {
  search: SearchStore;
}
export interface SearchStoreHydrateProps {
  searchParameters: IProductsSearchParameters;
  products: Array<ProductItemProps>;
  productCategory: Array<ICategoryTree>;
  productBrands: Array<IMarketBrand>;
  categoryId: number | null;
}

export interface IProductsSearchParameters {
  brands?: Array<number>;
  categories?: Array<number>;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: ISortBy;
  hasSellingStock?: boolean;
  discounted?: boolean;
  categoryId?: number;
  query?: string;
}
//#endregion
