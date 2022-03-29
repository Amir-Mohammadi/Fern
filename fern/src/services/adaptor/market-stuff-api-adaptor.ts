//#region imports
import { ICategoryTree } from '@Components/header';
import { ProductItemProps } from '@Components/product-item';
import {
  AskProductQuestionModel,
  CityModel,
  MarketBrandModel,
  MarketBriefStuffModel,
  MarketBriefStuffSearchParametersModel,
  MarketBrochureModel,
  MarketProductCategoryModel,
  MarketStuffAnswerModel,
  MarketStuffCommentModel,
  MarketStuffModel,
  MarketStuffPropertyModel,
  MarketStuffQuestionModel,
  OrderModel,
  ProductColorModel,
  ProductImageModel,
  ProductPriceModel,
  ProvinceModel,
  SortByModel,
} from '@Interfaces/api';
import { AnswerProductQuestionModel } from '@Interfaces/api/answer-product-question-model';
import {
  IAskProductQuestion,
  ICity,
  IMarketBrand,
  IMarketBrochure,
  IMarketMainProperty,
  IMarketProductCategory,
  IMarketStuffQuestion,
  IProduct,
  IProductAnswer,
  IProductColor,
  IProductComment,
  IProductImage,
  IProductPrice,
  IProductPropertyTree,
  IProvince,
} from '@Interfaces/common';
import { IAnswerProductQuestion } from '@Interfaces/common/answer-product-question';
import productCategoryTreeService from '@Services/common/product-category-tree.service';
import productPropertyTreeService from '@Services/common/product-properties-tree.service';
import { headerStoreService } from '@Services/stores/header-store.service';
import { IProductsSearchParameters, ISortBy } from '@Stores';
import { STATIC_FILE } from '@Utils/statics';
import { getStaticURl } from '../../../config';

//#endregion

class MarketStuffApiAdaptor {
  public transformQuestionsAndAnswers(questions: Array<MarketStuffQuestionModel>): Array<IMarketStuffQuestion> {
    return questions.map((question) => {
      return this._transformQuestionAndAnswer(question);
    });
  }

  private _transformAnswer(answers: MarketStuffAnswerModel): IProductAnswer {
    return {
      id: answers.id,
      firstName: answers.first_name ?? '',
      lastName: answers.last_name ?? '',
      createdAt: answers.created_at,
      payload: answers.payload ?? '',
      profileId: answers.profile_id,
    };
  }

  private _transformQuestionAndAnswer(question: MarketStuffQuestionModel): IMarketStuffQuestion {
    return {
      id: question.id,
      firstName: question.first_name ?? '',
      lastName: question.last_name ?? '',
      payload: question.payload ?? '',
      profileId: question.profile_id,
      userId: question.user_id,
      answers: this._transformAnswers(question.answers ?? []),
      createdAt: question.created_at ?? '',
    };
  }

  public reverseTransformAskQuestionModel(ask: IAskProductQuestion): AskProductQuestionModel {
    return {
      question: ask.question,
      row_version: null,
    };
  }

  public reverseTransformAnswerProductQuestionModel(ask: IAnswerProductQuestion): AnswerProductQuestionModel {
    return {
      answer: ask.answer,
    };
  }

  public transformMarketBrandsModel(marketBrands: Array<MarketBrandModel>) {
    return marketBrands.map((marketBrand) => {
      return this.transformMarketBrandModel(marketBrand);
    });
  }

  public async transformMarketProductCategories(
    marketProductCategoryModel: Array<MarketProductCategoryModel>,
    parentCategoryId?: number,
  ): Promise<Array<ICategoryTree>> {
    const transformMarketProductCategoryList = await productCategoryTreeService.transformMarketProductCategoryListToTree(
      marketProductCategoryModel,
      parentCategoryId,
    );

    return headerStoreService.prepareTreeViewNodes(transformMarketProductCategoryList);
  }

  public transformMarketMainPropertiesModel(marketMainProperties: Array<MarketStuffPropertyModel>) {
    return marketMainProperties.map((marketMainProperty) => {
      return this.transformMarketMainPropertyModel(marketMainProperty);
    });
  }
  public transformMarketStuffColorsModel(marketStuffColors: Array<ProductColorModel>) {
    return marketStuffColors.map((marketStuffColor) => {
      return this.transformProductColors(marketStuffColor);
    });
  }
  public transformMarketStuffPricesModel(marketStuffPrices: Array<ProductPriceModel>) {
    return marketStuffPrices.map((marketStuffPrice) => {
      return this._transformProductPriceModel(marketStuffPrice);
    });
  }
  public transformMarketStuffImagesModel(marketStuffImages: Array<ProductImageModel>) {
    return marketStuffImages.map((marketStuffImage) => {
      return this.transformProductImageModel(marketStuffImage);
    });
  }
  public transformMarketStuffCommentsModel(marketStuffComment: Array<MarketStuffCommentModel>): Array<IProductComment> {
    return marketStuffComment.map((comment) => {
      return this.transformMarketStuffCommentModel(comment);
    });
  }

  public transformMarketStuffCommentModel(marketStuffComment: MarketStuffCommentModel): IProductComment {
    return {
      id: marketStuffComment.id,
      author: {
        fullName: marketStuffComment.first_name + ' ' + marketStuffComment.last_name,
        id: 0,
      },
      payload: marketStuffComment.payload,
      createdAt: marketStuffComment.created_at,
      updateAt: marketStuffComment.created_at,
      product: {
        brandName: '',
        browserTitle: '',
        discount: 0,
        id: 1,
        metaDescription: '',
        name: '',
        previewProductImage: null,
        price: 1244,
        discountType: null,
        urlTitle: '',
      },
    };
  }

  public reverseTransformProductsSearchParameters(
    productsSearchParameters: IProductsSearchParameters,
  ): MarketBriefStuffSearchParametersModel {
    const [sortBy, order] = this._transformSortByInterface(productsSearchParameters.sortBy);

    var brands = productsSearchParameters.brands;
    var categories = productsSearchParameters.categories;
    var maxPrice = productsSearchParameters.maxPrice;
    var minPrice = productsSearchParameters.minPrice;
    var hasSellingStock = productsSearchParameters.hasSellingStock;
    var discounted = productsSearchParameters.discounted ?? false;
    var query = productsSearchParameters.query;

    return {
      ...(brands && { brand: brands }),
      ...(categories && { category: categories }),
      ...(maxPrice && { max_price: maxPrice + '' }),
      ...(minPrice && { min_price: minPrice + '' }),
      ...(sortBy && { sort_by: sortBy }),
      ...(order && { order: order }),
      ...(hasSellingStock && { has_selling_stock: hasSellingStock }),
      ...(discounted && { discounted: discounted }),
      ...(query && { q: query }),
    };
  }

  private _transformSortByInterface(productSortBy?: ISortBy): [SortByModel | undefined, OrderModel | undefined] {
    switch (productSortBy) {
      case ISortBy.BESTSELLING: {
        return [SortByModel.SALES, OrderModel.DESC];
      }
      case ISortBy.CHEAPEST: {
        return [SortByModel.PRICE, OrderModel.ASC];
      }
      case ISortBy.MOST_EXPENSIVE: {
        return [SortByModel.PRICE, OrderModel.DESC];
      }
      case ISortBy.POPULAR: {
        return [SortByModel.POPULARITY, OrderModel.DESC];
      }
      case ISortBy.MOST_VISITED: {
        return [SortByModel.VISITS, OrderModel.DESC];
      }
      case ISortBy.OFFERED: {
        return [SortByModel.OFFERED, OrderModel.DESC];
      }
      default: {
        return [undefined, undefined];
      }
    }
  }

  public transformMarketStuffModel(marketStuffModel: MarketStuffModel): IProduct {
    const productCategory = marketStuffModel.product_category
      ? this.transformMarketProductCategoryModel(marketStuffModel.product_category)
      : null;

    const productImage: IProductImage = marketStuffModel.preview_product_image
      ? this.transformProductImageModel(marketStuffModel.preview_product_image)
      : {
          id: 0,
          imageUrl: '/no_image_available.png',
          imageAlt: 'no_image_available',
          imageId: 'no_image_available',
          imageTitle: 'no_image_available',
          rowVersion: 'no_image_available',
          order: 0,
          tooltip: 'no_image_available',
        };

    const marketBrand = marketStuffModel.brand ? this.transformMarketBrandModel(marketStuffModel.brand) : null;

    return {
      altTitle: marketStuffModel.alt_title ?? '',
      briefDescription: marketStuffModel.brief_description ?? '',
      defaultColorId: marketStuffModel.default_color_id ?? 0,
      id: marketStuffModel.id,
      likedByMe: marketStuffModel.liked_by_me,
      name: marketStuffModel.name ?? '',
      brand: marketBrand,
      previewProductImage: productImage,
      productCategory: productCategory,
      rowVersion: marketStuffModel.row_version,
    };
  }

  public transformMarketBriefStuffsModel(marketBriefStuffs: Array<MarketBriefStuffModel>): Array<ProductItemProps> {
    return marketBriefStuffs.map((marketBriefStuff) => this.transformMarketBriefStuffModel(marketBriefStuff));
  }

  public transformMarketBriefStuffModel(marketBriefStuff: MarketBriefStuffModel): ProductItemProps {
    let offer = false;
    let discountPrice;
    if (marketBriefStuff.discount && marketBriefStuff.discount > 0) {
      discountPrice = (marketBriefStuff.price * (100 - marketBriefStuff.discount)) / 100;
      offer = true;
    }

    return {
      image: {
        src: STATIC_FILE(
          marketBriefStuff.preview_market_stuff_image!.image_id,
          marketBriefStuff.preview_market_stuff_image!.row_version,
        ),
        alt: marketBriefStuff.preview_market_stuff_image!.image_alt,
        title: marketBriefStuff.preview_market_stuff_image!.image_title,
      },
      realPrice: marketBriefStuff.price,
      text: marketBriefStuff.name ?? '',
      discountRate: marketBriefStuff.discount,
      postTime: 3,
      offer: offer,
      metaDescription: marketBriefStuff.meta_description ?? '',
      id: marketBriefStuff.id,
      discountPrice: discountPrice ?? 0,
      hasSellingStock: marketBriefStuff.has_selling_stock ?? false,
    };
  }

  public transformMarketBrandModel(marketBrandModel: MarketBrandModel): IMarketBrand {
    const imageUrl = getStaticURl(marketBrandModel.image_id ?? '', marketBrandModel.row_version ?? '');
    return {
      imageUrl: imageUrl,
      browserTitle: marketBrandModel.browser_title ?? '',
      id: marketBrandModel.id,
      imageAlt: marketBrandModel.image_alt ?? '',
      imageId: marketBrandModel.image_id ?? '',
      imageTitle: marketBrandModel.image_title ?? '',
      metaDescription: marketBrandModel.meta_description ?? '',
      name: marketBrandModel.name ?? '',
      profileId: marketBrandModel.profile_id ?? 0,
      rowVersion: marketBrandModel.row_version ?? '',
      urlTitle: marketBrandModel.url_title ?? '',
    };
  }
  public transformMarketBrochureModel(marketBrochureModel: MarketBrochureModel): IMarketBrochure | null {
    if (!marketBrochureModel) return null;

    return {
      id: marketBrochureModel.id,
      product_id: marketBrochureModel.product_id ?? 0,
      html: marketBrochureModel.html ?? '',
      row_version: marketBrochureModel.row_version,
    };
  }

  public transformMarketStuffPropertyModel(
    marketStuffProperties: Array<MarketStuffPropertyModel>,
  ): Array<IProductPropertyTree> {
    return productPropertyTreeService.transformMarketProductPropertyListToTree(marketStuffProperties);
  }

  public transformMarketMainPropertyModel(marketMainPropertyModel: MarketStuffPropertyModel): IMarketMainProperty {
    return {
      id: marketMainPropertyModel.id,
      value: marketMainPropertyModel.value ?? '',
      order: marketMainPropertyModel.order ?? 0,
      catalogItemId: marketMainPropertyModel.catalog_item_id ?? 0,
      rowVersion: marketMainPropertyModel.row_version ?? '',
      referenceId: marketMainPropertyModel.reference_id ?? 0,
      catalogItemKeyName: marketMainPropertyModel.catalog_item_key_name ?? '',
      extraKeyName: marketMainPropertyModel.extra_key_name ?? '',
      isMain: marketMainPropertyModel.is_main ?? false,
    };
  }
  public transformProductImageModel(productImageModel: ProductImageModel): IProductImage {
    const imageUrl = getStaticURl(productImageModel.image_id, productImageModel.row_version);
    return {
      id: productImageModel.id,
      imageUrl: imageUrl,
      imageAlt: productImageModel.image_alt,
      imageId: productImageModel.image_id,
      order: productImageModel.order,
      imageTitle: productImageModel.image_title,
      rowVersion: productImageModel.row_version,
      tooltip: productImageModel.image_title,
    };
  }

  public transformMarketProductCategoryModel(productCategory: MarketProductCategoryModel): IMarketProductCategory {
    return {
      browserTitle: productCategory.browser_title ?? '',
      explanation: productCategory.explanation ?? '',
      id: productCategory.id,
      metaDescription: productCategory.meta_description ?? '',
      name: productCategory.name ?? '',
      parentId: productCategory.parent_id,
      rowVersion: productCategory.row_version ?? '',
      urlTitle: productCategory.url_title ?? '',
    };
  }

  public transformProductColors(productColors: ProductColorModel): IProductColor {
    return {
      color: {
        HexCode: this._transformIntegerColorToHexColor(productColors.color.code),
        id: productColors.color?.id ?? productColors.color_id,
        name: productColors.color?.name ?? 'white',
        rowVersion: productColors.color?.row_version ?? 'empty',
      },
      colorId: productColors.color_id,
      productId: productColors.product_id,
    };
  }

  private _transformProductPriceModel(productPriceModel: ProductPriceModel): IProductPrice {
    return {
      colorId: productPriceModel.color_id ?? -1,
      discount: productPriceModel.discount ?? 0,
      discountType: productPriceModel.discount_type ?? 0,
      id: productPriceModel.id,
      maxPrice: productPriceModel.max_price ?? 0,
      minPrice: productPriceModel.min_price ?? 0,
      price: productPriceModel.price ?? 0,
      productId: productPriceModel.product_id ?? 0,
      discountedPrice: productPriceModel.discounted_price ?? 0,
      city: this._transformCityModel(productPriceModel.city),
    };
  }
  private _transformIntegerColorToHexColor(code: number) {
    return '#' + code.toString(16);
  }

  private _transformAnswers(answers: Array<MarketStuffAnswerModel>): Array<IProductAnswer> {
    return answers.map((answer) => {
      return this._transformAnswer(answer);
    });
  }
  private _transformCityModel(city: CityModel): ICity {
    return {
      id: city.id,
      name: city.name,
      province: this._transformProvinceModel(city.province),
      rowVersion: city.row_version,
    };
  }
  private _transformProvinceModel(province: ProvinceModel): IProvince {
    return {
      id: province.id,
      name: province.name,
      areaCode: province.area_code,
      rowVersion: province.row_version,
    };
  }
}

export { MarketStuffApiAdaptor };
