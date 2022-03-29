import { ProductCompareItemProps } from '@Components/product-compare-item';
import { ProductItemProps } from '@Components/product-item';
import { ComparePropertiesType, Target } from '@Components/screens/compare-screen';
import CompareService from '@Services/compare.service';
import { action, makeObservable, observable } from 'mobx';

export class CompareStore {
  private compareService: CompareService;
  constructor() {
    makeObservable(this);

    this.compareService = new CompareService();
  }

  @observable productsToCompare: Array<ProductItemProps> = [];
  @observable products: Array<ProductCompareItemProps> = [];
  @observable properties: Array<ComparePropertiesType> = [];
  @observable categoryId: number = -1;

  private async addProductToCompare(productId: number) {
    if (this.productsToCompare.some((product) => product.id === productId)) {
      return;
    }
    try {
      const product = await this.compareService.getProduct(productId);

      const temp = [...this.productsToCompare];
      temp.push(product);
      this.productsToCompare = temp;

      this.properties = await this.compareService.getMarketStuffProperties(this.properties, productId);
    } catch (error) {}
  }

  private removeProductFromCompare(index: number) {
    const productId = this.productsToCompare[index].id;

    const tempProperties = [...this.properties];
    tempProperties.forEach((property) => {
      property.items.forEach((item) => {
        item.values = item.values.filter((value) => {
          return value.productId !== productId;
        });
      });
    });
    this.properties = tempProperties;

    const temp = [...this.productsToCompare];
    temp.splice(index, 1);
    this.productsToCompare = temp;
  }

  private async getProduct(params: { product: string | string[] }) {
    var productId: number;
    if (Array.isArray(params.product)) {
      const productIdString = params.product[0].replace('elp-', '');
      productId = parseInt(productIdString);
    } else {
      const productIdString = params.product.replace('elp-', '');
      productId = parseInt(productIdString);
    }
    try {
      await this.addProductToCompare(productId);
      this.properties = await this.compareService.getMarketStuffFields(productId);
      this.properties = await this.compareService.getMarketStuffProperties(this.properties, productId);
      this.categoryId = await this.compareService.getCategoryId(productId);
    } catch (error) {}
  }

  private async getCategoryProducts() {
    try {
      this.products = await this.compareService.getProductsWithCategoryId(this.categoryId);
    } catch (error) {}
  }

  @action handleActions = (target: Target, value?: any) => {
    switch (target) {
      case Target.FORM_LOAD:
        this.getProduct(value);
        break;
      case Target.LOAD_PRODUCTS:
        this.getCategoryProducts();
        break;
      case Target.ADD_PRODUCT_TO_COMPARE:
        this.addProductToCompare(this.products[value].id);
        break;
      case Target.REMOVE_PRODUCT_FROM_COMPARE:
        this.removeProductFromCompare(value);
        break;
      default:
        break;
    }
  };
}

export interface InjectedCompareStore {
  compareStore: CompareStore;
}
