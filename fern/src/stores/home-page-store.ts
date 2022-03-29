//#region imports
import { BrandListProps } from '@Components/brands-list';
import { ProductItemProps } from '@Components/product-item';
import { SliderDataProps } from '@Components/slider';
import { PRODUCT_CATEGORY_ID } from '@Config';
import { apiService } from '@Services';
import { ISortBy } from '@Stores';
import { action, makeObservable, observable } from 'mobx';

//#endregion

export class HomeStore {
  constructor() {
    makeObservable(this);
  }

  @action public hydrate(initialState?: HomeStoreHydrateProps) {
    if (initialState === undefined) return;
  }

  @observable user: any; // save user data here

  @observable bestSellerProductList: ProductItemProps[] = [];
  @observable isLoadingBestSellerProductList: boolean = true;

  @observable fridgeAndFreezerProductList: ProductItemProps[] = [];
  @observable isLoadingFridgeAndFreezerProductList: boolean = false;

  @observable brandsList: BrandListProps[] = [];
  @observable isLoadingBrandsList: boolean = true;

  @observable coolingProductList: ProductItemProps[] = [];
  @observable isLoadingCoolingProductList: boolean = false;

  @observable offeredProductList: ProductItemProps[] = [];
  @observable isLoadingOfferedProductList: boolean = true;

  @observable popularProductList: ProductItemProps[] = [];
  @observable isLoadingPopularProductList: boolean = true;

  @observable sliderContent: SliderDataProps[] = [];
  @observable isLoadingSliderContent: boolean = true;
  @action fetchHomePageData() {}

  private async _fetchCoolingProductList() {
    this.isLoadingCoolingProductList = true;
    const coolingProduct = await apiService.v1.MarketApi.getMarketBriefStuffs({
      categories: [PRODUCT_CATEGORY_ID.COOLING],
    });
    this.coolingProductList = coolingProduct;
    this.isLoadingCoolingProductList = false;
  }

  private async _fetchFridgeAndFreezerProductList() {
    this.isLoadingFridgeAndFreezerProductList = true;
    const fridgeAndFreezerProduct = await apiService.v1.MarketApi.getMarketBriefStuffs({
      categories: [PRODUCT_CATEGORY_ID.FRIDGE_FREEZER],
    });
    this.fridgeAndFreezerProductList = fridgeAndFreezerProduct;
    this.isLoadingFridgeAndFreezerProductList = false;
  }

  private async _fetchBrandsList() {
    this.isLoadingBrandsList = true;
    const brands = await apiService.v1.MarketApi.getMarketBrands();
    this.brandsList = brands;
    this.isLoadingBrandsList = false;
  }

  private async _fetchPopularProductList() {
    this.isLoadingPopularProductList = true;
    const popularProduct = await apiService.v1.MarketApi.getMarketBriefStuffs({
      sortBy: ISortBy.POPULAR,
    });
    this.popularProductList = popularProduct;
    this.isLoadingPopularProductList = false;
  }

  private async _fetchBestSellerProductList() {
    this.isLoadingBestSellerProductList = true;
    const bestSellerProduct = await apiService.v1.MarketApi.getMarketBriefStuffs({
      sortBy: ISortBy.BESTSELLING,
    });
    this.bestSellerProductList = bestSellerProduct;
    this.isLoadingBestSellerProductList = false;
  }

  private async _fetchOfferedProductList() {
    this.isLoadingOfferedProductList = true;
    const offeredProduct = await apiService.v1.MarketApi.getMarketBriefStuffs({
      discounted: true,
    });
    this.offeredProductList = offeredProduct;
    this.isLoadingOfferedProductList = false;
  }

  private async _fetchSliderContent() {
    setTimeout(() => {
      this.sliderContent = [{ imageUrl: '1.png' }, { imageUrl: '2.png' }, { imageUrl: '3.png' }];
      this.isLoadingSliderContent = false;
    }, MOKE_DATA_BASE_INTERVAL);
  }

  @action onHomeStoreDidMount = () => {
    this._fetchBestSellerProductList();
    this._fetchOfferedProductList();
    this._fetchPopularProductList();
    this._fetchSliderContent();
    this._fetchBrandsList();
    this._fetchFridgeAndFreezerProductList();
    this._fetchCoolingProductList();
  };
}

//#region const
const MOKE_DATA_BASE_INTERVAL = 2000; // TODO clean this valuable after connection to databases
//#endregion

//#region types
export interface HomeStoreHydrateProps {}
export interface InjectedHomeStore {
  home: HomeStore;
}
//#endregion
