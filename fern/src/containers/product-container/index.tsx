//#region imports
import Product from '@Components/screens/product-screen';
import { IAnswerProductQuestion } from '@Interfaces/common/answer-product-question';
import { ComponentWithStore, connect } from '@Stores/core/decorator';
import { InjectedProductStore } from '@Stores/product-page-store';
import { observer } from 'mobx-react';
import React from 'react';
//#endregion
//--
@connect('product')
@observer
class ProductContainer extends ComponentWithStore<InjectedProductStore> {
  productStore = this.stores.product;

  render() {
    return (
      <Product
        toasts={{
          list: this.productStore.toastList,
          updateList: this.productStore.updateToastList,
        }}
        ProductMainProperties={this.productStore.productMainProperties}
        setTabBarTabIndex={(index) => this.productStore.setTabBarTabIndex(index)}
        tabBarSelectedTabIndex={this.productStore.tabBarSelectedTabIndex}
        productId={this.productStore.productId}
        addToFavorite={this.productStore.addToFavorite}
        removeFromFavorite={this.productStore.removeFromFavorite}
        brand={this.productStore.productBrand}
        category={this.productStore.productCategory}
        description={this.productStore.productBriefDescription}
        likedByMe={this.productStore.likedByMe}
        productDiscount={this.productStore.productDiscount}
        ProductColors={this.productStore.productColors}
        productPrices={this.productStore.productPrices}
        productImages={this.productStore.productImages}
        productName={this.productStore.productName}
        finalProductPrice={this.productStore.finalProductPrice}
        productPrice={this.productStore.productPrice}
        selectedColorIndex={this.productStore.selectedColorIndex}
        setSelectedColor={(index) => {
          this.productStore.setSelectedColor(index);
        }}
        productCommentsProps={{
          comments: this.productStore.productComments,
          isAddingNewComment: this.productStore.isAddingNewComment,
          toggleAddingNewComment: () => {
            this.productStore.toggleAddNewComment();
          },
          newComment: {
            onAdd: () => {
              this.productStore.onAddNewComment();
            },
            value: this.productStore.newCommentValue,
            onChange: (value) => {
              this.productStore.setNewCommentValue(value);
            },
          },
          isLoadingProductComments: this.productStore.isLoadingProductComments,
        }}
        productPropertiesProps={{
          properties: this.productStore.productProperties,
          isLoadingProductProperties: this.productStore.isLoadingProductProperties,
        }}
        productQuestionAndAnswer={{
          onAnswerQuestion: (questionId: number, newAnswer: IAnswerProductQuestion) => {
            this.productStore.addNewAnswer(questionId, newAnswer);
          },
          newQuestion: {
            value: this.productStore.newQuestionValue,
            onChange: (question) => {
              this.productStore.onChangeNewQuestion(question);
            },
            onClick: () => {
              this.productStore.addNewQuestion();
            },
          },
          questingList: this.productStore.productQuestionAndAnswers,
          //isLoadingProductQuestionAndAnswers: this.productStore.isLoadingProductQuestionAndAnswers,
        }}
        productBrochureProps={{
          brochureHtml: this.productStore.ProductBrochureHtml,
        }}
        addProductToCart={() => this.productStore.addProductToCart()}
      />
    );
  }
}

export default ProductContainer;
