import { ProductItemProps } from '@Components/product-item';
import { BrandInfo, Target } from '@Screens/brand-screen';
import BrandService from '@Services/brandService';
import { queryBuilder } from '@Utils/queryBuilder';
import { action, makeObservable, observable } from 'mobx';

export class BrandStore {
  private brandService: BrandService;
  constructor() {
    makeObservable(this);

    this.brandService = new BrandService();
  }

  @observable brand: BrandInfo = {
    id: -1,
    title: '',
    image: { src: '' },
  };
  @observable categories: Array<{ title: string; id: number }> = [];
  @observable products: Array<ProductItemProps> = [];

  private getBrandCategories = async () => {
    try {
      this.categories = await this.brandService.getBrandCategories(this.brand.id);
      if (this.categories.length) {
        this.getProducts(this.categories[0].id);
      }
    } catch (error) {}
  };

  private getProducts = async (categoryId: number) => {
    const params = queryBuilder({ categories: categoryId, brand: this.brand.id });

    try {
      this.products = await this.brandService.getMarketBriefStuffs(params);
    } catch (error) {}
  };

  @action handleActions = (target: Target, value?: any) => {
    switch (target) {
      case Target.FORM_LOAD:
        this.getBrandCategories();
        break;

      case Target.GET_PRODUCTS:
        this.getProducts(value);
        break;
      default:
        break;
    }
  };

  @action public hydrate(state?: BrandStoreHydrateProps) {
    if (state === undefined) return;

    this._hydrateBrandInfo(state.brand);
  }

  private async _hydrateBrandInfo(brand: {
    id: number;
    title: string;
    image: { src: string; alt?: string; title?: string };
  }) {
    this.brand = brand;
  }
}

export interface InjectedBrandStore {
  brandStore: BrandStore;
}

export interface BrandStoreHydrateProps {
  brand: BrandInfo;
}
