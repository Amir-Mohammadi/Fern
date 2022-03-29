//#region imports
import { ToastItemProps } from '@Components/toast/toast-item';
import {
  IMarketBrochure,
  IMarketMainProperty,
  IMarketStuffQuestion,
  IProduct,
  IProductAttributes,
  IProductColor,
  IProductComment,
  IProductImage,
  IProductPrice,
  IProductPropertyTree,
  IWriteComment,
} from '@Interfaces/common';
import { IAnswerProductQuestion } from '@Interfaces/common/answer-product-question';
import { cartService } from '@Services';
import { apiService } from '@Services/api';
import authService from '@Services/common/auth.service';
import ProductsService from '@Services/products.service';
import { productService } from '@Services/stores/product.service';
import { priceFormat } from '@Utils/common';
import { action, computed, makeObservable, observable } from 'mobx';
import { Stores } from './core/stores';

//#endregion

export class ProductStore {
  private productsService: ProductsService;
  //#region constructor

  constructor() {
    makeObservable(this);

    this.productsService = new ProductsService();
  }
  //#endregion
  private _productMainProperties: Array<IMarketMainProperty> = [];
  @observable productColors: Array<IProductColor> = [];
  @observable productAttributes: Array<IProductAttributes> = [];
  @observable selectedColorIndex: number = 0;
  @observable productId: number = 0;
  @observable productBrand: { id: number; name: string } = { id: -1, name: '' };
  @observable productCategory: { id: number; name: string } = { id: -1, name: '' };
  @observable productBriefDescription: string = '';
  @observable likedByMe: boolean = false;
  @observable productPrice: string = '0';
  @observable finalProductPrice: string = '0';
  @observable productDiscount: number = 0;
  @observable productImages: Array<IProductImage> = [];
  @observable productPrices: Array<IProductPrice> = [];
  @observable productName: string = '';
  @observable productProperties: Array<IProductPropertyTree> = [];
  @observable isLoadingProductProperties: boolean = false;
  @observable productComments: IProductComment[] = [];
  @observable isLoadingProductComments: boolean = false;
  @observable productQuestionAndAnswers: IMarketStuffQuestion[] = [];
  @observable isLoadingProductQuestionAndAnswers: boolean = false;
  @observable newCommentValue: string = '';
  @observable isAddingNewComment: boolean = false;
  @observable tabBarSelectedTabIndex: number = 0;
  @observable toastList: Array<ToastItemProps> = [];
  @observable newQuestionValue: string = '';
  @observable ProductBrochureHtml: string = '';
  @observable questionId: number = 0;
  private productPreviewImage: IProductImage = {
    id: 0,
    imageAlt: '',
    imageId: '',
    imageTitle: '',
    imageUrl: '',
    rowVersion: '',
    order: 0,
    tooltip: '',
  };
  @computed get productMainProperties(): IProductAttributes[] {
    const values: IProductAttributes[] = [];

    console.log(this._productMainProperties);

    this._productMainProperties?.forEach((productMainProperty) => {
      const i = values.findIndex((value) => value.catalogItemId === productMainProperty.catalogItemId);

      if (i === -1) {
        values.push({
          id: productMainProperty.id,
          catalogItemId: productMainProperty.catalogItemId,
          label: productMainProperty.catalogItemKeyName!,
          values: [productMainProperty.value],
        });
      } else {
        values[i].values.push(productMainProperty.value);
      }
    });
    return values;
  }

  @action setSelectedColor(index: number) {
    const selectedColor = this.productColors[index];
    if (!selectedColor) return;
    this.selectedColorIndex = index;
    const selectedColorsPrice = this.productPrices.find((price) => price.colorId == selectedColor.colorId);
    this.productPrice = priceFormat(selectedColorsPrice?.price ?? 0, 'fa', 'تومان');
    this.finalProductPrice = priceFormat(selectedColorsPrice?.discountedPrice ?? 0, 'fa', 'تومان');
  }

  @action async onAddNewComment() {
    try {
      this.isAddingNewComment = !this.isAddingNewComment;
      var productComment: IWriteComment = {
        text: this.newCommentValue,
      };
      await apiService.v1.MarketCustomerApi.addNewComment(this.productId, productComment);

      const productComments = await apiService.v1.MarketApi.getMarketStuffComments(this.productId);

      this.productComments = productComments; //hydrate
      this.newCommentValue = '';
    } catch (error) {
      // TODO
    }
  }

  @action addToFavorite = async () => {
    try {
      await this.productsService.likeProduct(this.productId);
      this.likedByMe = true;
    } catch (error) {
      // TODOِ
      console.log(error);
    }
  };
  @action removeFromFavorite = async () => {
    try {
      await this.productsService.unLikeProduct(this.productId);
      this.likedByMe = false;
    } catch (error) {
      // TODOِ
    }
  };

  @action toggleAddNewComment() {
    const token = authService.getToken();
    if (token == undefined) {
      window.location.href = '/login-register';
    } else {
      this.isAddingNewComment = !this.isAddingNewComment;
    }
  }

  @action setNewCommentValue(value: string) {
    this.newCommentValue = value;
  }

  @action setTabBarTabIndex(index: number) {
    this.tabBarSelectedTabIndex = index;
  }

  @action updateToastList = (id: number) => {
    this.toastList = this.toastList.filter((toast) => toast.id !== id);
  };

  @action async addNewQuestion() {
    if (this.newQuestionValue == '') return;

    const token = authService.getToken();
    if (token == undefined) {
      alert('please login to add question');
      return;
    }

    try {
      await productService.addQuestion(this.productId, {
        question: this.newQuestionValue,
      });
      this.newQuestionValue = '';

      const productQuestions = await apiService.v1.MarketApi.getProductQuestionsAndAnswers(this.productId);
      this.productQuestionAndAnswers = productQuestions; //hydrate
      alert('add question completed');
    } catch (error) {
      alert(error.message);
    }
  }

  @action async addProductToCart() {
    try {
      var selectedColor = this.productColors[this.selectedColorIndex];
      var selectedColorsPrice = this.productPrices.find((price) => price.colorId == selectedColor.colorId);

      await cartService.addProductToCart({
        productId: this.productId,
        color: selectedColor,
        brandName: this.productBrand.name,
        price: selectedColorsPrice,
        productName: this.productName,
        amount: 1,
        previewProductImage: this.productPreviewImage,
      });
      Stores?.headerStore.onFetchCartItemData();
      const toastTemp = [...this.toastList];
      toastTemp.push({
        id: Date.now(),
        duration: 3000,
        text: `محصول مورد نظر به سبد خرید اضافه شد`,
      });
      this.toastList = toastTemp;
      //window.location.href = PageUrls.Cart;
    } catch (error) {
      alert(error.message);
    }
  }

  @action async onChangeNewQuestion(question: string) {
    this.newQuestionValue = question;
  }

  @action async addNewAnswer(questionId: number, productQuestionAnswer: IAnswerProductQuestion) {
    if (productQuestionAnswer.answer == '') return;

    const token = authService.getToken();
    if (token == undefined) {
      alert('please login to add answer');
      return;
    }

    try {
      await productService.addProductionAnswer(this.productId, questionId, productQuestionAnswer);
      alert('done ');
      const productQuestions = await apiService.v1.MarketApi.getProductQuestionsAndAnswers(this.productId);
      this.productQuestionAndAnswers = productQuestions; //hydrate
    } catch (error) {
      alert(error.message);
    }
  }

  //#region hydrate
  @action public hydrate(state?: ProductStoreHydrateProps) {
    if (state === undefined) return;

    this._hydrateProductColors(state.productColors);
    this._hydrateProductInfo(state.product);
    this._hydrateProductImages(state.productImages);
    this._hydrateProductPrices(state.productPrices);
    this._hydrateProductMainProperties(state.productMainProperties);
    this._hydrateProductBrochureInfo(state.productBrochure);
  }

  @action private async _hydrateProductInfo(product: IProduct) {
    this.productId = product.id;
    this.productName = product.name;
    this.likedByMe = product.likedByMe;
    this.productBrand = product.brand ?? { id: -1, name: '' };
    this.productCategory = product.productCategory ?? { id: -1, name: '' };
    this.productBriefDescription = product.briefDescription;
    this.productPreviewImage = product.previewProductImage;
    this.productImages = product.previewProductImage ? [product.previewProductImage] : [];
    const defaultColorIndex = this.productColors.findIndex((x) => x.colorId == product.defaultColorId);
    this.setSelectedColor(-1 != defaultColorIndex ? defaultColorIndex : 0);
  }

  @action private _hydrateProductMainProperties(productMainProperties: Array<IMarketMainProperty>) {
    this._productMainProperties = productMainProperties;
  }
  @action private _hydrateProductColors(productColors: Array<IProductColor>) {
    this.productColors = productColors;
  }
  @action private _hydrateProductImages(productImages: Array<IProductImage>) {
    this.productImages = productImages;
  }
  @action private _hydrateProductPrices(productPrices: Array<IProductPrice>) {
    this.productPrices = productPrices;
    const selectedColor = this.productColors[this.selectedColorIndex];
    const selectedColorsPrice = this.productPrices.find((price) => price.colorId == selectedColor!.colorId);
    this.productPrice = priceFormat(selectedColorsPrice?.price ?? 0, 'fa', 'تومان');
    this.finalProductPrice = priceFormat(selectedColorsPrice?.discountedPrice ?? 0, 'fa', 'تومان');
  }
  @action private _hydrateProductBrochureInfo(productBrochure: IMarketBrochure | null) {
    this.ProductBrochureHtml = productBrochure?.html ?? '';
  }

  @action private _updateProductProperties(productProperties: IProductPropertyTree[]) {
    this.productProperties = productProperties;
  }

  @action private _updateProductComments(productComments: IProductComment[]) {
    this.productComments = productComments;
  }

  @action private _updateProductQuestionsAndAnswers(productQuestionAndAnswers: IMarketStuffQuestion[]) {
    this.productQuestionAndAnswers = productQuestionAndAnswers;
  }

  @action private _setProductPropertiesLoadingState(isLoading: boolean) {
    this.isLoadingProductProperties = isLoading;
  }

  @action private _setProductCommentsLoadingState(isLoading: boolean) {
    this.isLoadingProductComments = isLoading;
  }

  @action private _setProductQuestionAndAnswersLoadingState(isLoading: boolean) {
    this.isLoadingProductQuestionAndAnswers = isLoading;
  }

  private async _onFetchProductProperties() {
    this._setProductPropertiesLoadingState(true);

    try {
      const productProperties = await apiService.v1.MarketApi.getMarketStuffProperties(this.productId);
      this._updateProductProperties(productProperties);
    } catch (error) {
      alert('failed on fetch data ' + error.message);
    } finally {
      this._setProductPropertiesLoadingState(false);
    }
  }

  private async _onFetchProductComments() {
    this._setProductCommentsLoadingState(true);

    try {
      const productComments = await apiService.v1.MarketApi.getMarketStuffComments(this.productId);
      this._updateProductComments(productComments);
    } catch (error) {
      alert('failed on fetch data ' + error.message);
    } finally {
      this._setProductCommentsLoadingState(false);
    }
  }

  private async _onFetchProductQuestionsAndAnswers() {
    this._setProductQuestionAndAnswersLoadingState(true);

    try {
      const productQuestionAndAnswers = await apiService.v1.MarketApi.getProductQuestionsAndAnswers(this.productId);
      this._updateProductQuestionsAndAnswers(productQuestionAndAnswers);
    } catch (error) {
      alert('failed on fetch data ' + error.message);
    } finally {
      this._setProductQuestionAndAnswersLoadingState(false);
    }
  }

  async onFetchData() {
    this._onFetchProductProperties();
    this._onFetchProductComments();
    this._onFetchProductQuestionsAndAnswers();
  }

  //#endregion
}

//#region types
export interface InjectedProductStore {
  product: ProductStore;
}

export interface ProductStoreHydrateProps {
  product: IProduct;
  productBrochure: IMarketBrochure | null;
  productColors: Array<IProductColor>;
  productImages: Array<IProductImage>;
  productPrices: Array<IProductPrice>;
  productMainProperties: Array<IMarketMainProperty>;
}
//#endregion
