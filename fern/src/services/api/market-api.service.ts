import { ICategoryTree } from '@Components/header';
import { ProductItemProps } from '@Components/product-item';
import {
  IAskProductQuestion,
  IMarketBrand,
  IMarketBrochure,
  IMarketMainProperty,
  IMarketStuffQuestion,
  IProduct,
  IProductColor,
  IProductComment,
  IProductImage,
  IProductPrice,
  IProductPropertyTree,
} from '@Interfaces/common';
import { IAnswerProductQuestion } from '@Interfaces/common/answer-product-question';
import {
  AskProductQuestionModel,
  MarketBrandModel,
  MarketBriefStuffModel,
  MarketBriefStuffSearchParametersModel,
  MarketBrochureModel,
  MarketProductCategoryModel,
  MarketStuffCommentModel,
  MarketStuffModel,
  MarketStuffPropertyModel,
  MarketStuffQuestionModel,
  ProductColorModel,
  ProductImageModel,
  ProductPriceModel,
} from '@Services';
import { adaptorService } from '@Services/adaptor';
import { IProductsSearchParameters } from '@Stores';
import Transporter from '@Utils/transporter';

class MarketApiService {
  private _transporter: Transporter;

  constructor(transporter: Transporter) {
    this._transporter = transporter;
  }

  public async getMarketStuff(marketStuffId: number): Promise<IProduct> {
    const marketStuff = await this._transporter.get<MarketStuffModel>(`market-stuffs/${marketStuffId}/`);
    return adaptorService.marketStuffApiAdaptor.transformMarketStuffModel(marketStuff);
  }

  public async getMarketBrochure(marketStuffId: number): Promise<IMarketBrochure | null> {
    const marketBrochure = await this._transporter.get<MarketBrochureModel>(`market-stuffs/${marketStuffId}/brochure`);
    return adaptorService.marketStuffApiAdaptor.transformMarketBrochureModel(marketBrochure);
  }

  public async getMarketMainProperties(marketStuffId: number): Promise<Array<IMarketMainProperty>> {
    const marketMainProperties = await this._transporter.get<Array<MarketStuffPropertyModel>>(
      `market-stuffs/${marketStuffId}/main-properties`,
    );
    return adaptorService.marketStuffApiAdaptor.transformMarketMainPropertiesModel(marketMainProperties);
  }

  public async getMarketStuffColors(marketStuffId: number): Promise<Array<IProductColor>> {
    const marketColors = await this._transporter.get<Array<ProductColorModel>>(`market-stuffs/${marketStuffId}/colors`);
    return adaptorService.marketStuffApiAdaptor.transformMarketStuffColorsModel(marketColors);
  }

  public async getMarketStuffPrices(marketStuffId: number): Promise<Array<IProductPrice>> {
    const marketPrices = await this._transporter.get<Array<ProductPriceModel>>(`market-stuffs/${marketStuffId}/prices`);
    return adaptorService.marketStuffApiAdaptor.transformMarketStuffPricesModel(marketPrices);
  }

  public async getMarketStuffImages(marketStuffId: number): Promise<Array<IProductImage>> {
    const marketImages = await this._transporter.get<Array<ProductImageModel>>(`market-stuffs/${marketStuffId}/images`);
    return adaptorService.marketStuffApiAdaptor.transformMarketStuffImagesModel(marketImages);
  }

  public async getMarketBriefStuff(marketBriefStuffId: number) {
    return await this._transporter.get<MarketBriefStuffModel>(`market-brief-stuffs/${marketBriefStuffId}`);
  }

  public async getMarketBriefStuffs(filters?: IProductsSearchParameters): Promise<Array<ProductItemProps>> {
    var transformedFilters: MarketBriefStuffSearchParametersModel = {};
    if (filters !== undefined) {
      transformedFilters = adaptorService.marketStuffApiAdaptor.reverseTransformProductsSearchParameters(filters);
    }

    const marketBriefStuffs = await this._transporter.get<Array<MarketBriefStuffModel>>(`market-brief-stuffs`, {
      params: transformedFilters,
    });
    return adaptorService.marketStuffApiAdaptor.transformMarketBriefStuffsModel(marketBriefStuffs);
  }

  public async getMarketProductCategories(parentCategoryId?: number): Promise<Array<ICategoryTree>> {
    const marketProductCategories = await this._transporter.get<Array<MarketProductCategoryModel>>(
      `market-stuff-categories`,
    );

    return adaptorService.marketStuffApiAdaptor.transformMarketProductCategories(
      marketProductCategories,
      parentCategoryId,
    );
  }

  public async addProductionAnswer(
    productId: number,
    questionId: number,
    answerProductQuestion: IAnswerProductQuestion,
  ): Promise<void> {
    const transformedAnswerProductQuestion = adaptorService.marketStuffApiAdaptor.reverseTransformAnswerProductQuestionModel(
      answerProductQuestion,
    );
    return this._transporter.post<void>(`market-stuffs/${productId}/questions/${questionId}/answer`, {
      data: transformedAnswerProductQuestion,
    });
  }

  public async getMarketBrands(): Promise<Array<IMarketBrand>> {
    const marketBrands = await this._transporter.get<Array<MarketBrandModel>>(`market-brands`);
    return adaptorService.marketStuffApiAdaptor.transformMarketBrandsModel(marketBrands);
  }

  public async getMarketStuffComments(marketStuffId: number): Promise<Array<IProductComment>> {
    const marketStuffComments = await this._transporter.get<Array<MarketStuffCommentModel>>(
      `market-stuffs/${marketStuffId}/comments`,
    );
    return adaptorService.marketStuffApiAdaptor.transformMarketStuffCommentsModel(marketStuffComments);
  }

  public async getMarketStuffProperties(marketStuffId: number): Promise<Array<IProductPropertyTree>> {
    const marketStuffProperties = await this._transporter.get<Array<MarketStuffPropertyModel>>(
      `market-stuffs/${marketStuffId}/properties`,
    );
    return adaptorService.marketStuffApiAdaptor.transformMarketStuffPropertyModel(marketStuffProperties);
  }

  public async addProductionQuestion(productId: number, askProductQuestion: IAskProductQuestion): Promise<void> {
    const transformedAskProductQuestion: AskProductQuestionModel = adaptorService.marketStuffApiAdaptor.reverseTransformAskQuestionModel(
      askProductQuestion,
    );

    await this._transporter.post<void>(`market-stuffs/${productId}/questions/ask`, {
      data: transformedAskProductQuestion,
    });
  }

  public async getProductQuestionsAndAnswers(productId: number): Promise<IMarketStuffQuestion[]> {
    const showQuestions = await this._transporter.get<Array<MarketStuffQuestionModel>>(
      `market-stuffs/${productId}/questions`,
    );
    return adaptorService.marketStuffApiAdaptor.transformQuestionsAndAnswers(showQuestions);
  }
}

export default MarketApiService;
