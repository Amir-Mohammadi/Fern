import { IAskProductQuestion, IProductAnswer } from '@Interfaces/common';
import { IAnswerProductQuestion } from '@Interfaces/common/answer-product-question';
import { apiService } from '@Services/api';

export class ProductService {
  public async addQuestion(productId: number, askProductQuestion: IAskProductQuestion): Promise<void> {
    return await apiService.v1.MarketApi.addProductionQuestion(productId, askProductQuestion);
  }

  public async addProductionAnswer(
    productId: number,
    questionId: number,
    askProductQuestion: IAnswerProductQuestion,
  ): Promise<void> {
    return await apiService.v1.MarketApi.addProductionAnswer(productId, questionId, askProductQuestion);
  }

  public async getQuestions(productId: number): Promise<IProductAnswer[]> {
    return await apiService.v1.MarketApi.getProductQuestionsAndAnswers(productId);
  }
}

//#region singleton export
const productService = new ProductService();
export { productService };
//#endregion
